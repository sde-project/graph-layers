// Initialization
const express = require('express');
const adapterLayer = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const docs = require('./doc/index');
const axios = require('axios');

// Route modules
const graph = require('./routes/graph');

// Load environment variables
require('dotenv').config();

// Middlewares
adapterLayer.use(express.json({limit: '50mb'}));
adapterLayer.use(morgan("dev"));
adapterLayer.use(cors());

// Documentation
adapterLayer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

// Check permissions
adapterLayer.use((req, res, next) => {
    if (req.headers.authorization !== process.env.GRAPH_BUSINESS_API_KEY) {
        return res.status(401).send({ error: "Unauthorized" })
    } else {
        // Set default authorization for graph adapter
        axios.defaults.headers.common["Authorization"] = process.env.GRAPH_ADAPTER_API_KEY;
        next();
    }
});

// API endpoints
adapterLayer.use('/graph/', graph);

// Default 404 handler
adapterLayer.use((req, res) => {
    res.status(404).json({
        error: "Not Found"
    });
});

// Centralized Error Handler
adapterLayer.use((err, req, res, next) => {
    console.log("Error: " + err);
    res.status(500).json({
        message: `Internal Server Error - ${err}`,
    });
});

// Start server
adapterLayer.listen(process.env.PORT || 8000, () => {
    console.log(`Graph Business Logic Layer listening on port ${process.env.PORT || 8000}`);
});
