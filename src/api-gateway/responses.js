export class SuccessRes {
    req
    res
    responseType
    details
    costumData

    constructor(req, res, responseType, details) {
        this.req = req
        this.res = res
        this.responseType = responseType
        this.details = details
        this.costumData = {}
    }

    _getObject() {
        let response = {
            body: {
                code: this.responseType.code,
                type: this.responseType.type,
                details: this.details,
                apiVersion: process.env.API_VERSION,
                timestamp: new Date(Date.now()).toISOString(),
                path: this.req.originalUrl
            }
        }



        for (const [key, value] of Object.entries(this.costumData)) {
            response.body[key] = value
        }

        return response
    }

    addCostumData(key, value) {
        this.costumData[key] = value
    }

    send() {
        const responseObj = this._getObject()

        this.res.statusMessage = responseObj.body.type
        this.res.status(responseObj.body.code).json(responseObj)
    }
}


export class ErrorRes {
    req
    res
    responseType
    details

    constructor(req, res, responseType, details) {
        this.req = req
        this.res = res
        this.responseType = responseType
        this.details = details
    }

    _getObject() {
        return {
            error: {
                code: this.responseType.code,
                type: this.responseType.type,
                details: this.details,
                apiVersion: process.env.API_VERSION,
                timestamp: new Date(Date.now()).toISOString(),
                path: this.req.originalUrl
            }
        }
    }

    send() {
        const responseObj = this._getObject()
        this.res.statusMessage = responseObj.error.type
        this.res.status(responseObj.error.code).json(responseObj)
    }
}


export const ResponseTypes = {
    Success200: { code: 200, type: "SUCCESS" },
    BadRequest400: { code: 400, type: "BAD_REQUEST" },
    MissingApiKey401: { code: 401, type: "MISSING_API_KEY" },
    InvalidApiKey401: { code: 401, type: "INVALID_API_KEY" },
    NotAllowedMethod405: { code: 405, type: "NOT_ALLOWED_METHOD" },
    TooManyRequests429: { code: 429, type: "TOO_MANY_REQUESTS" },
    UnavailableApi502: { code: 502, type: "UNAVAILABLE_API" }
}

