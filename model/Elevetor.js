const mongoose = require("mongoose");

const elevatorSystemSchema = new mongoose.Schema({
  floor: Number,
  direction: {
    type: String,
    enum: ["up", "down"],
    default: "up",
  },
  status: {
    type: String,
    enum: ["available", "busy", "maintenance"],
    default: "available",
  },
  doorStatus: {
    type: String,
    enum: ["open", "closed"],
    default: "closed",
  },
  requests: [
    {
      floor: Number,
      direction: String,
    },
  ],
});

const ElevatorSystem = mongoose.model("ElevatorSystem", elevatorSystemSchema);

module.exports = ElevatorSystem;
