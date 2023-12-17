const deleteController = require("./controllers/deleteController.js")
const getController = require("./controllers/getController.js")
const postController = require("./controllers/postController.js")
const putController = require("./controllers/putController.js")
const { ErrorRes, ResponseTypes } = require("./controllers/responses.js")


module.exports = setupRoutes

function setupRoutes(app) {

    app.use('/api/movies/:id', (req, res, next) => {

        if (req.method == "GET") {
            return getController(req, res)
        }

        if (req.method == "DELETE") {
            return deleteController(req, res)
        }

        if (req.method == "PUT") {
            return putController(req, res)
        }


        const errResp = new ErrorRes(req, res, ResponseTypes.NotAllowedMethod405)

        errResp.send()
    })


    app.use('/api/movies/', async (req, res) => {

        if (req.method == "GET") {
            console.log("here")
            return getController(req, res)
        }

        if (req.method == "POST") {
            return postController(req, res)
        }

        if (req.method == "DELETE") {
            return deleteController(req, res)
        }

        
        const errResp = new ErrorRes(req, res, ResponseTypes.NotAllowedMethod405)

        errResp.send()
    })
}
