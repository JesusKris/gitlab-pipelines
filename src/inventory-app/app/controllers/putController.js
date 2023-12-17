const { updateMovie } = require("../data/queries");
const { ErrorRes, ResponseTypes, SuccessRes } = require("./responses");


module.exports = async function putController(req, res) {

    const internalServerError = new ErrorRes(req, res, ResponseTypes.InternalServerError500, "Something went wrong. Please try again later.")

    if (req.params.id && req.body.title || req.params.id && req.body.description) {

        try {

            let isUpdated = await updateMovie(req.params.id, req.body.title, req.body.description)

            const resp = new SuccessRes(req, res, ResponseTypes.Success200, isUpdated ? "Successfully updated the movie." : "Movie with given id doesn't exist.")

            return resp.send()

        }
        catch (err) {
            return internalServerError.send()
        }

    }

    
    const errResp = new ErrorRes(req, res, ResponseTypes.BadRequest400, "Invalid request url or body.")

    errResp.send()
}