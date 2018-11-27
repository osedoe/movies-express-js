import { pull } from 'lodash';
import movies = require('../../data/movies');
import bodyIsNotEmpty = require('../../utils/bodyIsNotEmpty');
import { Movie } from './../../models/model';
import idExists = require('../../utils/idExists');

export function getMovies(): Movie[] {
    return movies;
}

export function findMovieById(idToSearch: string) {
    return movies.find((movie) => movie.id === idToSearch);
}

export function addMovie(newMovie) {
    if (bodyIsNotEmpty(newMovie)) {
        newMovie.id = `${ movies.length + 1 }`;
        movies.push(newMovie);
        return newMovie;
    } else {
        return false;
    }
}

export function updateMovie(id, movieToUpdate) {
    if (bodyIsNotEmpty(movieToUpdate)) {
        const moviePosition = movies.findIndex((movie) => movie.id === id);
        if (moviePosition >= 0) {
          movies[moviePosition] = movieToUpdate;
          return movies[moviePosition];
        }
    } else {
        return false;
    }
}

export function deleteMovie(id) {
    if (!idExists(movies, id)) {
        return false;
    } else {
        const movieToDelete = movies.find((movie) => movie.id === id);
        pull(movies, movieToDelete);
        return true;
    }
}

export function getLikes() {
    return movies.filter((movie) => movie.like === true);
}

export function likeMovie(id) {
    if (!idExists(movies, id)) {
        return false;
    } else {
        const likedMovie = movies.find((movie) => movie.id === id);
        likedMovie.like = true;
        return true;
    }
}

export function dislikeMovie(id) {
    if (!idExists(movies, id)) {
        return false;
    } else {
        const dislikedMovie = movies.find((movie) => movie.id === id);
        dislikedMovie.like = false;
        return true;
    }
}
