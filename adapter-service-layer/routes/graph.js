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

    // Generate graph URL
    const chartURLGeneration = new QuickChart();
    chartURLGeneration.setVersion("3");
    chartURLGeneration.setConfig(req.body);
    const urlToFetch = chartURLGeneration.getUrl();

    // Get graph
    axios.get(urlToFetch, {responseType: 'arraybuffer'})
        .then(graph => {
            res.set("Content-Type", "image/png");
            res.send(graph.data);
        })
        .catch(e => next(e));
});

module.exports = router;
