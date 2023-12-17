const { getBills } = require("../data/queries.js")
const { SuccessRes, ErrorRes, ResponseTypes } = require("./responses.js")


module.exports = async function getController(req, res) {

    const internalServerError = new ErrorRes(req, res, ResponseTypes.InternalServerError500, "Something went wrong. Please try again later.")
    
    if (req.baseUrl === "/api/billing") {

        try {

            const billsData = await getBills()

            let resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully got all the bills.")

            resp.addCostumData("bills", billsData)

            return resp.send()

        }
        catch {
            return internalServerError.send()
        }

    }


    const errResp = new ErrorRes(req, res, ResponseTypes.BadRequest400, "Invalid request url or body.")

    errResp.send()
}