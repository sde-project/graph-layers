const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Generate graph PNG
 */
router.post("/", async (req, res, next) => {
    if (!req.body.news || !req.body.exchanges) {
        return res.status(400).json({
            error: "Bad Request - the body of the request must contain news and exchanges"
        });
    }

    // Define chart.js configuration - DEBUG define a constant one
    let configuration = {
        "type": "line",
        "data": {
          "labels": ["January", "February", "March", "April", "May", "June", "July"],
          "datasets": [{
            "type": "line",
            "label": "Dataset 1",
            "borderColor": "rgb(54, 162, 235)",
            "borderWidth": 2,
            "fill": false,
            "data": [51,23,1,62,3,2,16]
          }]
        },
      "options": {
        "responsive": true,
        "maintainAspectRatio": false,
        "plugins": {
          "annotation": {
          "annotations": [{
            "type": "line",
            "borderColor": "black",
            "borderDash": [20,10],
            "borderWidth": 2,
            "label": {
              "padding": 10,
              "position": "start",
              "yAdjust": 45,
              "content": "Test Label",
              "enabled": true
            },
            "scaleID": "x",
            "value": "February"
          }, {
            "type": "line",
            "borderColor": "black",
            "borderDash": [20,10],
            "borderWidth": 2,
            "label": {
              "padding": 10,
              "yAdjust": 0,
              "position": "start",
              "content": "Test Label",
              "enabled": true
            },
            "scaleID": "x",
            "value": "March"
          }, {
            "type": "line",
            "borderColor": "black",
            "borderDash": [20,10],
            "borderWidth": 2,
            "label": {
              "padding": 10,
              "yAdjust": 45,
              "position": "start",
              "content": "Test Label",
              "enabled": true
            },
            "scaleID": "x",
            "value": "April"
          }]
        }
        }
      }
    };

    // Generate graph
    axios.post("http://localhost:8000/graph", configuration, {responseType: 'arraybuffer'})
        .then(graph => {
            res.set("Content-Type", "image/png");
            res.send(graph.data);
        })
        .catch(e => next(e));
});

module.exports = router;
