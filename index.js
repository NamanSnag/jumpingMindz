const express = require('express');

// Create Express app
const app = express();
const port = 3000;

require('dotenv').config();
require('./config/mongoose');

const cors = require('cors');

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes'));

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: message,
    stack: err.stack
  });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });