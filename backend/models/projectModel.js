const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the offer schema
const offerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define the project schema
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["مفتوح", "مغلق", "قيد التنفيذ"],
      default: "مفتوح",
    },
    budget: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    skills: {
      type: [String],
      required: true,
    },
    offers: {
      type: [offerSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to populate comments for this project
projectSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

// Create and export the Project model
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
