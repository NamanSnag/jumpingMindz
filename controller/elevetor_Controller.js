// Import the ElevatorSystem model
const ElevatorSystem = require("../model/Elevetor");

// Initialize the elevator system
const initializeElevatorSystem = async (req, res, next) => {
  try {
    // Get the number of elevators from the request body
    const { numberOfElevators } = req.body;

    // Create an array to hold the elevator system objects
    const elevatorSystems = [];

    // Create the specified number of elevator systems
    for (let i = 0; i < numberOfElevators; i++) {
      // Create a new elevator system
      const elevatorSystem = new ElevatorSystem({
        floor: 1, // Starting floor
      });

      // Save the elevator system to the database
      await elevatorSystem.save();

      // Push the elevator system to the array
      elevatorSystems.push(elevatorSystem);
    }

    return res.status(200).json({
      message: "Elevator system initialized successfully",
      elevatorSystems,
    });
  } catch (error) {
    next(error);
  }
};

const getElevatorRequests = async (req, res, next) => {
  try {
    // Get the elevator ID from the request parameters
    const { id } = req.params;

    // Find the elevator system by ID
    const elevatorSystem = await ElevatorSystem.findById(id);

    // If elevator system is not found, return an error response
    if (!elevatorSystem) {
      return res.status(404).json({ error: "Elevator system not found" });
    }

    // Get the requests for the elevator system
    const requests = elevatorSystem.requests;

    res.status(200).json({
      elevatorId: elevatorSystem._id,
      requests,
    });
  } catch (error) {
    next(error);
  }
};

const getNextDestination = async (req, res, next) => {
  try {
    // Get the elevator ID from the request parameters
    const { id } = req.params;

    // Find the elevator system by ID
    const elevatorSystem = await ElevatorSystem.findById(id);

    // If elevator system is not found, return an error response
    if (!elevatorSystem) {
      return res.status(404).json({ error: "Elevator system not found" });
    }

    // Get the direction and current floor of the elevator system
    const { direction, floor } = elevatorSystem;

    // Get the requests for the elevator system
    const requests = elevatorSystem.requests;

    // Find the next destination floor based on the elevator's direction
    let nextDestination = null;
    if (direction === "up") {
      const floorsAbove = requests
        .filter((request) => request.floor > floor)
        .map((request) => request.floor);
      nextDestination = Math.min(...floorsAbove);
    } else if (direction === "down") {
      const floorsBelow = requests
        .filter((request) => request.floor < floor)
        .map((request) => request.floor);
      nextDestination = Math.max(...floorsBelow);
    }

    res.status(200).json({
      elevatorId: elevatorSystem._id,
      nextDestination,
    });
  } catch (error) {
    next(error);
  }
};

const getMovingDirection = async (req, res, next) => {
  try {
    // Get the elevator ID from the request parameters
    const { id } = req.params;

    // Find the elevator system by ID
    const elevatorSystem = await ElevatorSystem.findById(id);

    // If elevator system is not found, return an error response
    if (!elevatorSystem) {
      return res.status(404).json({ error: "Elevator system not found" });
    }

    // Get the direction of the elevator system
    const direction = elevatorSystem.direction;

    res.status(200).json({
      elevatorId: elevatorSystem._id,
      movingDirection: direction,
    });
  } catch (error) {
    next(error);
  }
};

const markMaintenance = async (req, res, next) => {
  try {
    // Get the elevator ID from the request parameters
    const { id } = req.params;

    // Find the elevator system by ID
    const elevatorSystem = await ElevatorSystem.findById(id);

    // If elevator system is not found, return an error response
    if (!elevatorSystem) {
      return res.status(404).json({ error: "Elevator system not found" });
    }

    // Update the status of the elevator system to "maintenance"
    elevatorSystem.status = "maintenance";

    // Save the elevator system to the database
    await elevatorSystem.save();

    res.status(200).json({
      message: "Elevator marked as maintenance",
      elevatorId: elevatorSystem._id,
      status: elevatorSystem.status,
    });
  } catch (error) {
    next(error);
  }
};

const updateDoorStatus = async (req, res, next) => {
  try {
    // Get the elevator ID from the request parameters
    const { id } = req.params;

    // Find the elevator system by ID
    const elevatorSystem = await ElevatorSystem.findById(id);

    // If elevator system is not found, return an error response
    if (!elevatorSystem) {
      return res.status(404).json({ error: "Elevator system not found" });
    }

    // Get the current door status from the request body
    const { doorStatus } = req.body;

    // Update the door status of the elevator system
    elevatorSystem.doorStatus = doorStatus;

    // Save the updated elevator system to the database
    await elevatorSystem.save();

    res.status(200).json({
      message: "Door status updated",
      elevatorId: elevatorSystem._id,
      doorStatus: elevatorSystem.doorStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  initializeElevatorSystem,
  getElevatorRequests,
  getNextDestination,
  getMovingDirection,
  markMaintenance,
  updateDoorStatus
};
