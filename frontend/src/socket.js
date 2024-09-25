// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://chatapp-2exa.onrender.com");
// const socket = io("http://localhost:8000");

export default socket;
   