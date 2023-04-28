const MovieController = require('../controllers/movie.controller');


module.exports = (app) => {

    app.get('/api/movies', MovieController.findAllMovies);
    app.post('/api/movies/new', MovieController.createNewMovie);
    app.get('/api/movies/:id', MovieController.findOneMovie);
    app.delete('/api/movies/:id', MovieController.deleteOneMovie);
    app.put('/api/movies/edit/:id', MovieController.updateMovie);
}