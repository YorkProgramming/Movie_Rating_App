const RatingController = require('../controllers/rating.controller');

module.exports = (app) => {

    app.get('/api/rating', RatingController.findAllRating);
    app.get('/api/rating/mostRatedMovie', RatingController.findMostRatedMovie);
    app.get('/api/rating/user/:id', RatingController.findRatingsByUser);
    app.get('/api/rating/movie/:id', RatingController.findRatingsByMovie);
    app.post('/api/rating/new', RatingController.createNewRating);
    app.get('/api/rating/:id', RatingController.findOneRating);
    app.delete('/api/rating/:id', RatingController.deleteOneRating);
    app.patch('/api/rating/edit/:id', RatingController.updateRating);
}