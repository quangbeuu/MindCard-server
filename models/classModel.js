const mongoose = require("mongoose");
const User = require("./userModel");

const classSchema = new mongoose.Schema(
  {
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
    folderNum: {
      type: Number,
      default: 0,
    },
    member: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    createdBy: Array,
    createdAt: { type: Date, default: Date.now() },
    imageCover: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Embedded data lq den host vao ClassModel

classSchema.pre("save", async function (next) {
  const hostPromises = this.createdBy.map(
    async (id) => await User.findById(id, { name: 1, email: 1, avatarUrl: 1 })
  );

  this.createdBy = await Promise.all(hostPromises);

  next();
});

// Populate cho tất cả các query dùng find
classSchema.pre(/^find/, function (next) {
  this.populate({
    path: "member",
    select: "_id name email avatarUrl -classes",
  });
  next();
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
