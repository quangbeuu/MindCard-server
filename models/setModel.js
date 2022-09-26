const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A set must have a name."],
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: String,
  createdAt: { type: Date, default: Date.now() },
  numCards: Number,
  image: String,
  slug: String,
});

const Set = mongoose.model("Set", setSchema);
module.exports = Set;
