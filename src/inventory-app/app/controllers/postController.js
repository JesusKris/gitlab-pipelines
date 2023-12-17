const { createMovie } = require("../data/queries")
const { SuccessRes, ResponseTypes, ErrorRes } = require("./responses")


module.exports = async function postController(req, res) {

    const internalServerError = new ErrorRes(req, res, ResponseTypes.InternalServerError500, "Something went wrong. Please try again later.")

    console.log("hello")
    if (req.body.title && req.body.description) {

        try {


            await createMovie(req.body.title, req.body.description)

            const resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully created new movie.")

            return resp.send()
      
        }
        catch {
            return internalServerError.send()
        }
    
    }

    const errResp = new ErrorRes(req, res, ResponseTypes.BadRequest400, "Invalid request url or body.")

    errResp.send()
}