const express = require("express");
const {
  initializeElevatorSystem,
  getElevatorRequests,
  getNextDestination,
  getMovingDirection,
  markMaintenance,
  updateDoorStatus,
} = require("../controller/elevetor_Controller");
const router = express.Router();

// Initialize the elevator system
router.post("/", initializeElevatorSystem);

// Fetch all requests for a given elevator
router.get("/:id/requests", getElevatorRequests);

// Fetch the next destination floor for a given elevator
router.get("/:id/next-destination", getNextDestination);

// Fetch if the elevator is moving up or down currently
router.get("/:id/moving-direction", getMovingDirection);

// Mark an elevator as not working or in maintenance
router.put("/:id/maintenance", markMaintenance);

// Open/close the door
router.put("/:id/door", updateDoorStatus);

module.exports = router;
