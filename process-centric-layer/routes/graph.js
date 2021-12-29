const express = require('express');
const router = express.Router();
const axios = require('axios');
const { EXCHANGES, CRYPTOS } = require('../constants');

router.get("/image", async (req, res, next) => {
    // Check if the request is valid
    if (!req.query.from || !req.query.to || !req.query.currency) {
        return res.status(400).json({
            error: "Bad Request - the query parameters from, to and currency must be provided"
        });
    }

    // Get time frame
    const currency = req.query.currency;

    if (CRYPTOS.indexOf(currency) == -1) {
        return res.status(400).json({
            error: `Bad Request - the specified currency is not valid. Valid currencies are: ${CRYPTOS.join(",")}`
        });
    }

    let exgs = EXCHANGES;
    if (req.query.exchanges) {
        exgs = req.query.exchanges;
    }

    const exchangesHost = process.env.EXCHANGES_DATA_HOST;
    const newsHost = process.env.NEWS_BUSINESS_HOST;
    const graphBusinessHost = process.env.GRAPH_BUSINESS_HOST;

    const news = await axios.get(`${newsHost}/search?from=${req.query.from}&to=${req.query.to}`, {
        headers: {
            Authorization: process.env.NEWS_BUSINESS_API_KEY
        }
    }).catch(e => {
        return res.status(e.response.status).json({"error": e.response.statusText});
    }).then(res => res.data);
    
    let exchanges = [];
    for (let i = 0; i < exgs.length; i++) {
        const res = await axios.get(`${exchangesHost}/price/crypto/${currency}/from/${req.query.from}/to/${req.query.to}/operation/buy/exchange/${exgs[i]}`, {
            headers: {
                Authorization: process.env.EXCHANGES_DATA_API_KEY
            }
        }).catch(e => {
            return res.status(e.response.status).json({"error": e.response.statusText});
        });
        let toPush = {};
        toPush[exgs[i]] = res.data;
        exchanges.push(toPush);
    }

    axios.post(`${graphBusinessHost}/graph/image`, {news, exchanges}, {
        headers: {
            Authorization: process.env.GRAPH_BUSINESS_API_KEY
        }, responseType: 'arraybuffer'
    })
        .then(graph => {
            res.set("Content-Type", "image/png");
            res.send(graph.data);
        })
        .catch(e => res.status(e.response.status).json({"error": e.response.statusText}));
});

router.get("/configuration", async (req, res, next) => {
    // Check if the request is valid
    if (!req.query.from || !req.query.to || !req.query.currency) {
        return res.status(400).json({
            error: "Bad Request - the query parameters from, to and currency must be provided"
        });
    }

    // Get time frame
    const currency = req.query.currency;

    if (CRYPTOS.indexOf(currency) == -1) {
        return res.status(400).json({
            error: `Bad Request - the specified currency is not valid. Valid currencies are: ${CRYPTOS.join(",")}`
        });
    }

    let exgs = EXCHANGES;
    if (req.query.exchanges) {
        exgs = req.query.exchanges;
    }

    const exchangesHost = process.env.EXCHANGES_DATA_HOST;
    const newsHost = process.env.NEWS_BUSINESS_HOST;
    const graphBusinessHost = process.env.GRAPH_BUSINESS_HOST;

    const news = await axios.get(`${newsHost}/search?from=${req.query.from}&to=${req.query.to}`, {
        headers: {
            Authorization: process.env.NEWS_BUSINESS_API_KEY
        }
    }).catch(e => {
        return res.status(e.response.status).json({"error": e.response.statusText});
    }).then(res => res.data);
    
    let exchanges = [];
    for (let i = 0; i < exgs.length; i++) {
        const res = await axios.get(`${exchangesHost}/price/crypto/${currency}/from/${req.query.from}/to/${req.query.to}/operation/buy/exchange/${exgs[i]}`, {
            headers: {
                Authorization: process.env.EXCHANGES_DATA_API_KEY
            }
        }).catch(e => {
            return res.status(e.response.status).json({"error": e.response.statusText});
        });
        let toPush = {};
        toPush[exgs[i]] = res.data;
        exchanges.push(toPush);
    }

    axios.post(`${graphBusinessHost}/graph/configuration`, {news, exchanges}, {
        headers: {
            Authorization: process.env.GRAPH_BUSINESS_API_KEY
        }
    })
        .then(graph => {
            res.json(graph.data);
        })
        .catch(e => res.status(e.response.status).json({"error": e.response.statusText}));
});

module.exports = router;