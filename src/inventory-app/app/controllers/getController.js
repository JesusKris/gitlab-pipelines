const { getMovieById, getMoviesBasedOnTitle, getMovies } = require("../data/queries.js")
const { SuccessRes, ErrorRes, ResponseTypes } = require("./responses.js")


module.exports = async function getController(req, res) {

    const internalServerError = new ErrorRes(req, res, ResponseTypes.InternalServerError500, "Something went wrong. Please try again later.")

    if (req.params.id) {

        try {

            const movieData = await getMovieById(req.params.id)

            let resp = new SuccessRes(req, res, ResponseTypes.Success200, movieData ? "Successfully got a movie." : "No movie found with given id.")

            resp.addCostumData("movie", movieData)

            return resp.send()

        }
        catch {
            return internalServerError.send()
        }
    }


    if (req.query.title) {

        try {

            const moviesData = await getMoviesBasedOnTitle(req.query.title)

            let resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully got all the matching movies.")

            resp.addCostumData("movies", moviesData)

            return resp.send()

        }
        catch {
            return internalServerError.send()
        }

    }

    
    if (req.baseUrl === "/api/movies") {
        try {

            const moviesData = await getMovies()

            let resp = new SuccessRes(req, res, ResponseTypes.Success200, "Successfully got all the movies.")

            resp.addCostumData("movies", moviesData)

            return resp.send()

        }
        catch {
            return internalServerError.send()
        }

    }


    const errResp = new ErrorRes(req, res, ResponseTypes.BadRequest400, "Invalid request url or body.")

    errResp.send()
}