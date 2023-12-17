import express from 'express';
import morgan from "morgan";
import { setupProxies, setupRateLimit } from './proxy.js';
import { ErrorRes, ResponseTypes } from './responses.js';
import { connectQueue } from './publisher.js';

const app = express()

/* app.use(express.json()); */
setupRateLimit(app)
setupProxies(app)
connectQueue()

app.use(morgan('dev'));

app.use((err, req, res, next) => {

    const errResp = new ErrorRes(req, res, ResponseTypes.UnavailableApi502,"This api might be experiencing issues or is under maintenance. Please try again later.")

    errResp.send()
});


app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Gateway listening at http://localhost:${process.env.EXPRESS_PORT}`)
})