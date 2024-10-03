const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const connectToDb = require("./config/connectToDb");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const { Server } = require("socket.io");
const { errorHandler, notFound } = require("./middlewares/error");
const projectRoutes = require("./routes/projectRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { User } = require("./models/User");
const Message = require("./models/Message");
const Chat = require("./models/Chat");
const googleRoutes = require("./routes/googleAuth");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const blockUsers = require("./routes/userBlockRoutes");
const Blocklist = require("./models/Blocklist");
const sendEmail = require("./utils/sendEmail");


// Connect to DB
connectToDb();

// Initialize App
const app = express();  

// Middleware
app.use(express.json());

app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200,
  })
);
const corsOptions = {
    origin: "*", // Your frontend origin
    credentials: true, // This allows the browser to include cookies in the requests
  };

  app.use(cors(corsOptions));


app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Adjust based on your requirements
    }
  }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/posts", require("./routes/postsRoute"));
app.use("/api/comments", require("./routes/commentsRoute"));
app.use("/api/categories", require("./routes/categoriesRoute"));
app.use("/api/password", require("./routes/passwordRoute"));
app.use("/api", projectRoutes);
app.use("/api/search", require("./routes/search"));
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", googleRoutes);
app.use("/api/users", blockUsers);
app.use("/blocklist", require("./routes/blockList"))

 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.get("/config",(req,res)=>{

  res.send({publishableKey: process.env.STRIPE_PUBLISHABLE_KEY})
})

app.get("/hide", (req, res) => {
  res.json({"Success":process.env.STRIPE_SECRET_KEY});
})

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Error Handlers
app.use(notFound);
app.use(errorHandler);
// Start the Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Socket.IO Setup
const io = new Server(server, { cors: "*" });

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room ${room}`);
  });

  socket.on("getUsersInRoom", async (room, callback) => {
    const users = io.sockets.adapter.rooms.get(room);
    if (users) {
      const userIds = Array.from(users.keys());
      const usersDetails = await User.find({ userId: { $in: userIds } });
      callback(usersDetails);
    }
  });

  socket.on("getChats", async (userId, callback) => {
    const chats = await Chat.find({ participants: userId }).populate(
      "participants"
    );
    callback(chats);
  });

  socket.on("createChat", async (participants) => {
    try {
      const newChat = new Chat({ participants });
      await newChat.save();
      io.emit("newChat", newChat);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  });

  socket.on("getMessages", async (chatId) => {
    const chatMessages = await Message.find({ chatId }).sort("timestamp");
    io.to(chatId).emit("getMessages", chatMessages);
  });

  socket.on("fetchMessages", async ({ chatId }, callback) => {
    try {
      const messages = await Message.find({ chatId });
      callback(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  // socket.on("sendMessage", async (messageData) => {
  //   const message = new Message(messageData);
  //   await message.save();
  //   io.emit("getMessage", message); // This should notify all clients
  // });

  socket.on("getOnlineUsers", () => {
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("getNotifications", async (senderId) => {
    const notifications = await Message.find({
      receiverId: senderId,
      read: false,
    }).countDocuments();
    io.emit("getNotifications", notifications);
  });

  socket.on("readNotification", async (notificationId) => {
    await Message.findByIdAndUpdate(notificationId, { read: true });
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
  
  socket.on("sendMessage", async (messageData) => {
    try {
      const phoneNumberRegex = /\b\d{10,}\b/g;
      const { senderId, receiverId, content } = messageData;
      
      // Check if the sender is in the blocklist
      const isSenderBlocked = await Blocklist.findOne({ userId: senderId });
      if (isSenderBlocked) {
        console.log(`Sender ${senderId} is blocked. Message not sent.`);
        socket.emit("messageBlocked", {
          reason: "لقد تم حظرك من ارسال اى رسا~ل. اتصل بالدعم للمزيد من التفاصيل.",
        });
        return; // Prevent sending the message
      }
  
      // Extract phone numbers from message content
      const phoneNumbers = content.match(phoneNumberRegex) || [];
      if (phoneNumbers.length > 0) {
        // Add sender to blocklist if a phone number is found in the message
        let blocklistEntry = await Blocklist.findOne({ userId: senderId });
  
        if (!blocklistEntry) {
          // Create a new blocklist entry if not found
          blocklistEntry = new Blocklist({
            userId: senderId,
            reason: "Sent phone number",
          });
          await blocklistEntry.save();
  
          // Send email to the user
          const user = await User.findById(senderId);
          if (user) {
            await sendEmail(
              user.email,
              "لقد تم حظرك",
              "<p>لقد تم حظرك من التواصل مع اعضاء منصتنا  (Tallento). اذا كنت تعتقد ان هناك خطأ, من فضلك اتل بنا.</p>"
            );
          }
        }
      }
  
      // Check if the receiver has blocked the sender
      const isReceiverBlocked = await Blocklist.findOne({ userId: receiverId });
      if (isReceiverBlocked) {
        console.log(`Receiver ${receiverId} has blocked the sender. Message not sent.`);
        return; // Prevent sending the message
      }
  
      // Save the message if not blocked
      const message = new Message(messageData);
      await message.save();
      io.emit("getMessage", message); // Emit the message to all clients
  
    } catch (error) {
      console.error("Error in sendMessage:", error);
    }
  });
});
