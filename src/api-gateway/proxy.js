import { authUser } from './auth.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { rateLimit } from 'express-rate-limit';
import { ErrorRes, ResponseTypes } from './responses.js';
import { sendToQ } from './publisher.js';

import express from 'express';


const moviesProxy = createProxyMiddleware({
    target: `http://${process.env.MOVIES_IP}:${process.env.EXPRESS_PORT}`,
    changeOrigin: true,
    logLevel: "silent",
    onError: (err, req, res) => {

        const errResp = new ErrorRes(req, res, ResponseTypes.UnavailableApi502, "This api might be experiencing issues or is under maintenance. Please try again later.")

        errResp.send()
    }
});

const billingGetProxy = createProxyMiddleware({
    target: `http://${process.env.BILLING_IP}:${process.env.EXPRESS_PORT}`,
    changeOrigin: true,
    logLevel: 'silent',
    onError: (err, req, res) => {

        const errResp = new ErrorRes(req, res, ResponseTypes.UnavailableApi502, "This api might be experiencing issues or is under maintenance. Please try again later.")

        errResp.send()
    }
});

export function setupProxies(app) {

    app.use("/api/movies", authUser, moviesProxy)

    app.use("/api/billing", express.json(), authUser, (req, res, next) => {

        if (req.method === 'POST') {
            return sendToQ(req, res)
        }

        if (req.method === 'GET') {
            return billingGetProxy(req, res, next);
        }

        const errResp = new ErrorRes(req, res, ResponseTypes.NotAllowedMethod405, "Invalid method used. Available methods are: [GET, POST].")

        errResp.send()

    })
}

export function setupRateLimit(app) {

    const apiLimiter = rateLimit({
        windowMs: Number(process.env.API_RATELIMIT_DURATION),
        max: Number(process.env.API_RATELIMIT_MAX),
        standardHeaders: true,
        handler: (req, res) => {

            const errResp = new ErrorRes(req, res, ResponseTypes.TooManyRequests429, `You are sending too many requests, please slow down! Limit is ${process.env.API_RATELIMIT_MAX} requests per ${Number(process.env.API_RATELIMIT_DURATION) / 1000} second.`)

            errResp.send()
        }
    })

    app.use(apiLimiter)
}

