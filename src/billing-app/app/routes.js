const getController = require("./controllers/getController.js")
const { ErrorRes, ResponseTypes } = require("./controllers/responses.js")


module.exports = setupRoutes

function setupRoutes(app) {

    app.use('/api/billing/', async (req, res) => {

        if (req.method == "GET") {
            return getController(req, res)
        }

        const errResp = new ErrorRes(req, res, ResponseTypes.NotAllowedMethod405)

        errResp.send()
    })
}