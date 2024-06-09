const mongoose = require("mongoose");

const GymData = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
    },
    plan: {
      type: String,
      required: [true, "Please enter a Plan"],
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    medical_History: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Gym = mongoose.model("Gym_Data",GymData);

module.exports = Gym;
