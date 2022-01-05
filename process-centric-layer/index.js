// Initialization
const express = require('express');
const processLayer = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const docs = require('./doc/index');

// Route modules
const graph = require('./routes/graph');

// Load environment variables
require('dotenv').config();

// Middlewares
processLayer.use(express.json({limit: '50mb'}));
processLayer.use(morgan("dev"));
processLayer.use(cors());

// Documentation
processLayer.use('/graph/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// API endpoints
processLayer.use('/graph/', graph);

// Default 404 handler
processLayer.use((req, res) => {
    res.status(404).json({
        message: "Not Found"
    });
});

// Centralized Error Handler
processLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        error: `Internal Server Error - ${err}`,
    });
});

// Start server
processLayer.listen(process.env.PORT || 8000, () => {
    console.log(`Graphs process centric Layer listening on port ${process.env.PORT || 8000}`);
});
