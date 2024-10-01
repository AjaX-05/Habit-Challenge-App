const mongoose = require("mongoose");
const { type } = require("os");

const challenges = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Enter a description"],
    },
    startDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
    participants: {
      type: [String],
      required: false,
    },
    progress: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const Challenges = mongoose.model("Challenges", challenges);

module.exports = Challenges;
