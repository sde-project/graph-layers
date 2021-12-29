const express = require('express');
const router = express.Router();
const axios = require('axios');
const QuickChart = require('quickchart-js');

/**
 * Generate graph PNG
 */
router.post("/", async (req, res, next) => {
    if (!req.body || (req.body.constructor === Object && Object.keys(req.body).length === 0)) {
        return res.status(400).json({
            error: "Bad Request - the body of the request must contain a chart.js configuration"
        });
    }

    // Generate body for quickchart request
    const requestBody = {
        width: 500,
        height: 300,
        backgroundColor: "#ffffff",
        format: "png",
        version: 3,
        chart: req.body
    }

    axios.post("https://quickchart.io/chart", requestBody, {responseType: 'arraybuffer'})
        .then(graph => {
            res.set("Content-Type", "image/png");
            res.send(graph.data);
        })
        .catch(e => next(e));
});

module.exports = router;
