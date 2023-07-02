# Elevator System

This project implements a simplified elevator system using Node.js, Express.js, and MongoDB. It provides APIs to initialize the elevator system, manage elevators, and handle user requests.

## Features

- Initialize the elevator system with a specified number of elevators
- Fetch all requests for a given elevator
- Fetch the next destination floor for a given elevator
- Fetch if the elevator is moving up or down currently
- Save user requests to the list of requests for an elevator
- Mark an elevator as not working or in maintenance
- Open/close the door

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Setup

Clone the repository:

   ```bash
   git clone https://github.com/your-username/elevator-system.git
```
## API Endpoints

    POST /elevator-system - Initialize the elevator system
    GET /elevator-system/:id/requests - Fetch all requests for a given elevator
    GET /elevator-system/:id/next-destination - Fetch the next destination floor for a given elevator
    GET /elevator-system/:id/moving-direction - Fetch if the elevator is moving up or down currently
    POST /elevator-system/:id/requests - Save user request to the list of requests for an elevator
    PUT /elevator-system/:id/maintenance - Mark an elevator as not working or in maintenance
    PUT /elevator-system/:id/door - Open/close the door