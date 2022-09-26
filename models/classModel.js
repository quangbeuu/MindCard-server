const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "A class must have a name."],
  },
  description: {
    type: String,
    trim: true,
  },
  setNum: {
    type: Number,
    default: 0,
  },
  memberNum: {
    type: Number,
    default: 1,
  },
  createdBy: String,
  createdAt: { type: Date, default: Date.now() },
  imageCover: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
  },
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
