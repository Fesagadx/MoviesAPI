const { getAll, create, getOne, remove, update, setGenresMovies, setActorsMovies, setDirectorsMovies } = require('../controllers/movie.controller');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerMovie.route('/:id/genres')
    .post(setGenresMovies)

routerMovie.route('/:id/actors')
    .post(setActorsMovies)

routerMovie.route('/:id/directors')
    .post(setDirectorsMovies)

module.exports = routerMovie;