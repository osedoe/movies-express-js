import express from 'express';
import morgan from 'morgan';
const app = express();
const port = 3001;
import moviesRouter from './api/movies';

// this allows express to get body info for POST requests
app.use(express.json());

app.use(morgan('combined'));

app.use('/movies', moviesRouter);

app.listen(port, () => {
    console.log(`Express running on port ${port}.`);
});
