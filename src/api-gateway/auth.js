import { ErrorRes, ResponseTypes } from "./responses.js";

export function authUser(req, res, next) {

    const userKey = req.query.key;

    const apiKey = process.env.API_KEY;


    if (!userKey) {

        const errResp = new ErrorRes(req, res, ResponseTypes.MissingApiKey401, "You are required to provide an api key in the request params.")

        return errResp.send()
    }


    if (userKey !== apiKey) {

        const errResp = new ErrorRes(req, res, ResponseTypes.InvalidApiKey401, "Provided api key is invalid.")

        return errResp.send()
    }

    next();
}