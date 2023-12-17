const { deleteMovie, deleteAllMovies } = require("../data/queries")
const { ErrorRes, ResponseTypes, SuccessRes } = require("./responses")

module.exports = async function deleteController(req, res) {

    const internalServerError = new ErrorRes(req, res, ResponseTypes.InternalServerError500, "Something went wrong. Please try again later.")
    
    if (req.params.id) {

        try {

            await deleteMovie(req.params.id)

            const resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully deleted a movie with given id.")

            return resp.send()

        }
        catch {
            return internalServerError.send()
        }
    }


    if (req.baseUrl === "/api/movies") {

        try {

            await deleteAllMovies()

            const resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully deleted all the movies.")

            return resp.send()

        }
        catch {
            return internalServerError.send()
        }

    }

    const errResp = new ErrorRes(req, res, ResponseTypes.BadRequest400, "Invalid request url or body.")

    errResp.send()
}