const express = require('express');
const router = express.Router();
const axios = require('axios');

const {
  generateAnnotations,
  generateDataFromExchanges,
  generateLabelsFromExchanges,
  orderNewsByDate
} = require('../utils');

/**
 * Generate graph PNG
 */
router.post("/image", async (req, res, next) => {
  if (!req.body.news || !req.body.exchanges) {
    return res.status(400).json({
      error: "Bad Request - the body of the request must contain news and exchanges"
    });
  }

  const host = process.env.ADAPTER_HOST;

  const labels = generateLabelsFromExchanges(req.body.exchanges);

  // Make the news visible only if they are not too much close to each other
  let filteredNews = [];
  const minExchangeDate = new Date(req.body.exchanges[0].date);
  const maxExchangeDate = new Date(req.body.exchanges[req.body.exchanges.length - 1].date);
  const diffExchangeDate = maxExchangeDate - minExchangeDate;
  const orderedNews = orderNewsByDate(req.body.news);
  let previous = -1;
  for (let i = 0; i < orderedNews.length; i++) {
    const newsDate = new Date(orderedNews[i].publishedAt);
    if ((previous == -1 || (newsDate - previous > diffExchangeDate / 5)) && (newsDate.getTime() >= minExchangeDate && newsDate.getTime() <= maxExchangeDate)) {
      filteredNews.push(orderedNews[i]);
      previous = newsDate;
    }
  }

  const dataForDataset = generateDataFromExchanges(req.body.exchanges);
  const annotations = generateAnnotations(filteredNews);

  // Define chart.js configuration - DEBUG define a constant one
  let configuration = {
    "type": "line",
    "data": {
      "labels": labels,
      "datasets": [{
        "type": "line",
        "label": "Prices in $",
        "borderColor": "purple",
        "borderWidth": 2,
        "fill": false,
        "pointRadius": 0,
        "data": dataForDataset
      }]
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": false,
      "plugins": {
        "annotation": {
          "annotations": annotations
        },
      },
      "scales": {
        x: {
          type: "time",
          time: {
            unit: "day"
          }
        }
      }
    }
  };

  // Generate graph
  axios.post(`http://${host}/graph`, configuration, { responseType: 'arraybuffer' })
    .then(graph => {
      res.set("Content-Type", "image/png");
      res.send(graph.data);
    })
    .catch(e => next(e));
});

/**
 * Generate chart.js configuration
 */
router.post("/configuration", async (req, res, next) => {
  if (!req.body.news || !req.body.exchanges) {
    return res.status(400).json({
      error: "Bad Request - the body of the request must contain news and exchanges"
    });
  }

  const labels = generateLabelsFromExchanges(req.body.exchanges);

  // Make the news visible only if they are not too much close to each other
  let filteredNews = [];
  const minExchangeDate = new Date(req.body.exchanges[0].date);
  const maxExchangeDate = new Date(req.body.exchanges[req.body.exchanges.length - 1].date);
  const diffExchangeDate = maxExchangeDate - minExchangeDate;
  const orderedNews = orderNewsByDate(req.body.news);
  let previous = -1;
  for (let i = 0; i < orderedNews.length; i++) {
    const newsDate = new Date(orderedNews[i].publishedAt);
    if ((previous == -1 || (newsDate - previous > diffExchangeDate / 5)) && (newsDate.getTime() >= minExchangeDate && newsDate.getTime() <= maxExchangeDate)) {
      filteredNews.push(orderedNews[i]);
      previous = newsDate;
    }
  }

  const dataForDataset = generateDataFromExchanges(req.body.exchanges);
  const annotations = generateAnnotations(filteredNews);

  // Define chart.js configuration - DEBUG define a constant one
  let configuration = {
    "type": "line",
    "data": {
      "labels": labels,
      "datasets": [{
        "type": "line",
        "label": "Prices in $",
        "borderColor": "purple",
        "borderWidth": 2,
        "fill": false,
        "pointRadius": 0,
        "data": dataForDataset
      }]
    },
    "options": {
      "responsive": true,
      "maintainAspectRatio": false,
      "plugins": {
        "annotation": {
          "annotations": annotations
        },
      },
      "scales": {
        x: {
          type: "time",
          time: {
            unit: "day"
          }
        }
      }
    }
  };

  res.status(200).json(configuration);
});

module.exports = router;
