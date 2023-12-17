const db = require("./models/index.js")
const { Op } = require("sequelize");

module.exports = { getMovieById, getMoviesBasedOnTitle, getMovies, createMovie, updateMovie, deleteAllMovies, deleteMovie }

async function getMovieById(movieId) {

    const movie = await db.sequelize.models.Movies.findOne({
        where: {
            id: movieId,
        },
        raw: true,
    });

    return movie
}


async function getMoviesBasedOnTitle(queryWord) {

    const movies = await db.sequelize.models.Movies.findAll({
        where: {
            title: {
                [Op.like]: `%${queryWord}%`,
            },
        },
    });

    return movies
}

async function getMovies() {

    const movies = await db.sequelize.models.Movies.findAll();

    return movies
}

async function createMovie(movietitle, movieDescription) {
    await db.sequelize.models.Movies.create({ title: movietitle, description: movieDescription })
}

async function updateMovie(movideId, movieTitle, movieDescription) {

    const changes = {};

    if (movieTitle !== undefined && movieTitle !== null) {
        changes.title = movieTitle;
    }

    if (movieDescription !== undefined && movieDescription !== null) {
        changes.description = movieDescription;
    }


    const [updatedCount] = await db.sequelize.models.Movies.update(changes, {
        where: {
            id: movideId
        },
    });


    return updatedCount > 0 ? true : false
}

async function deleteMovie(movieId) {

    await db.sequelize.models.Movies.destroy({
        where: {
            id: movieId
        }
    })

}


async function deleteAllMovies() {

    await db.sequelize.models.Movies.destroy({
        truncate: true
    })

}