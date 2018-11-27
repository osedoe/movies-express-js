import express from 'express';
export const router = express.Router();
import controller from './controllers';

router.get('/', (req, res) => {
    const movies = controller.getMovies();
    res.json(movies);
});

router.get('/likes', (req, res) => {
    const likedMovies = controller.getLikes();

    if (likedMovies.length > 0) {
        res.json(likedMovies);
    } else {
        res.status(200).send({
            message: 'Nobody has liked any movie yet. Try again in the future.',
        });
    }
});

router.get('/:id', (req, res) => {
    const movieById = controller.findMovieById(req.params.id);

    if (movieById !== undefined) {
        res.json(movieById);
    } else {
        res.status(400).send({
            message: `Sorry, there is no movie assigned to this id (${req.params.id}). Try another one.`,
        });
    }
});

router.post('/', (req, res) => {
    const newMovie = controller.addMovie(req.body);

    if (newMovie === false) {
        res.status(400).send({
            message: 'Oops, an error has ocurred while adding new movie.',
        });
    } else {
        res.json({
            message: 'New Movie added!',
            newMovie,
        });
    }
});

router.put('/:id', (req, res) => {
    const updatedMovie = controller.updateMovie(req.params.id, req.body);

    if (updatedMovie === false) {
        res.status(400).send({
            message: 'Oops, an error has ocurred while updating movie.',
        });
    } else {
        res.json({
            message: `Movie ${req.params.id} has been updated!`,
            updatedMovie,
        });
    }
});

router.delete('/:id', (req, res) => {
    const movieIsDeleted = controller.deleteMovie(req.params.id);

    if (movieIsDeleted === false) {
        res.status(400).send({
            message: 'Sorry, the movie you\'re trying to delete does not exist.',
        });
    } else {
        res.status(200).send({
            message: `Movie (id: ${req.params.id}) has been deleted!`,
        });
    }
});

router.put('/likes/:id', (req, res) => {
    const result = controller.likeMovie(req.params.id);

    if (result === false) {
        res.status(400).send({
            message: 'Sorry, you cannot like a movie that does not exist.',
        });
    } else {
        res.status(200).send({
            message: `Congrats!, you have liked movie ${req.params.id}).`,
        });
    }
});

router.delete('/likes/:id', (req, res) => {
    const result = controller.dislikeMovie(req.params.id);

    if (result === false) {
        res.status(400).send({
            message: 'Sorry, you cannot dislike a movie that does not exist.',
        });
    } else {
        res.status(200).send({
            message: `You have disliked movie ${req.params.id}).`,
        });
    }
});
