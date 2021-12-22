const express = require('express');
const router = express.Router();
const axios = require('axios');

function generateAnnotationFromNews(news, isEven) {
  return {
    "type": "line",
    "borderColor": "black",
    "borderDash": [20,10],
    "borderWidth": 2,
    "label": {
      "padding": 10,
      "position": "start",
      "yAdjust": isEven ? 45 : 0,
      "content": news.title,
      "enabled": true
    },
    "scaleID": "x",
    "value": news.publishedAt
  };
}

function generateAnnotations(newsArray) {
  let isEven = true;
  let annotations = [];
  for (const news in newsArray) {
    if (Object.hasOwnProperty.call(newsArray, news)) {
      const element = newsArray[news];
      annotations.push(generateAnnotationFromNews(element, isEven));
      isEven = !isEven;
    }
  }
}

function generateLabelsFromExchanges(exchanges) {
  let labels = [];
  for (const exchange in exchanges) {
    if (Object.hasOwnProperty.call(exchanges, exchange)) {
      labels.push(exchanges[exchange].date);
    }
  }
  return labels;
}

function generateDataFromExchanges(exchanges) {
  let data = [];
  for (const exchange in exchanges) {
    if (Object.hasOwnProperty.call(exchanges, exchange)) {
      const element = exchanges[exchange];
      data.push(element.price);
    }
  }
  return data;
}

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
    const dataForDataset = generateDataFromExchanges(req.body.exchanges);
    const annotations = generateAnnotations(req.body.news);

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
            "data": dataForDataset
          }]
        },
      "options": {
        "responsive": true,
        "maintainAspectRatio": false,
        "plugins": {
          "annotation": {
            "annotations": annotations
          }
        }
      }
    };

    // Generate graph
    axios.post(`http://${host}/graph`, configuration, {responseType: 'arraybuffer'})
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
  const dataForDataset = generateDataFromExchanges(req.body.exchanges);
  const annotations = generateAnnotations(req.body.news);

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
          "data": dataForDataset
        }]
      },
    "options": {
      "responsive": true,
      "maintainAspectRatio": false,
      "plugins": {
        "annotation": {
          "annotations": annotations
        }
      }
    }
  };

  res.status(200).json(configuration);
});

module.exports = router;
