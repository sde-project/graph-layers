const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get("/image", async (req, res, next) => {
    // Check if the request is valid
    if (!req.query.from || !req.query.to || !req.query.currency) {
        return res.status(400).json({
            error: "Bad Request - the query parameters from, to and currency must be provided"
        });
    }

    // Get time frame
    const fromDate = new Date(req.query.from);
    const toDate = new Date(req.query.to);
    const currency = req.query.currency;

    const exchangesHost = process.env.EXCHANGES_BUSINESS_HOST;
    const newsHost = process.env.NEWS_BUSINESS_HOST;
    const graphBusinessHost = process.env.GRAPH_BUSINESS_HOST;

    const news = await axios.get(`${newsHost}/from=${fromDate}&to=${Date.now()}}`, {
        headers: {
            Authorization: process.env.NEWS_BUSINESS_API_KEY
        }
    }).catch(e => {
        return next(e);
    });
    const exchanges = await axios.get(`${exchangesHost}/price/crypto/${currency}/since/${fromDate}/operation/buy/exchange/${exc}`, {
        headers: {
            Authorization: process.env.EXCHANGES_DATA_API_KEY
        }
    }).catch(e => {
        return next(e);
    });

    axios.post(`${graphBusinessHost}/graph/image`, [news, exchanges], {
        headers: {
            Authorization: process.env.GRAPH_BUSINESS_API_KEY
        }, responseType: 'arraybuffer'
    })
        .then(graph => {
            res.set("Content-Type", "image/png");
            res.send(graph.data);
        })
        .catch(e => next(e));
});

router.get("/configuration", async (req, res, next) => {
    // Check if the request is valid
    if (!req.query.from || !req.query.to || !req.query.currency) {
        return res.status(400).json({
            error: "Bad Request - the query parameters from, to and currency must be provided"
        });
    }

    // Get time frame
    const fromDate = new Date(req.query.from);
    const toDate = new Date(req.query.to);
    const currency = req.query.currency;

    const exchangesHost = process.env.EXCHANGES_BUSINESS_HOST;
    const newsHost = process.env.NEWS_BUSINESS_HOST;
    const graphBusinessHost = process.env.GRAPH_BUSINESS_HOST;

    const exc = "Kraken";

    const news = await axios.get(`${newsHost}/from=${fromDate}&to=${Date.now()}}`, {
        headers: {
            Authorization: process.env.NEWS_BUSINESS_API_KEY
        }
    }).catch(e => {
        return next(e);
    });
    const exchanges = await axios.get(`${exchangesHost}/price/crypto/${currency}/since/${fromDate}/operation/buy/exchange/${exc}`, {
        headers: {
            Authorization: process.env.EXCHANGES_DATA_API_KEY
        }
    }).catch(e => {
        return next(e);
    });

    axios.post(`${graphBusinessHost}/graph/configuration`, [news, exchanges], {
        headers: {
            Authorization: process.env.GRAPH_BUSINESS_API_KEY
        }, responseType: 'arraybuffer'
    })
        .then(graph => {
            res.json(graph.data);
        })
        .catch(e => next(e));
});

module.exports = router;