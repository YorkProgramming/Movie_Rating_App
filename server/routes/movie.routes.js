const UserController = require('../controllers/user.controller');
const RatingController = require('../controllers/rating.controller');

module.exports = (app) => {

    app.post("/api/rating/new", RatingController.createNewRating);
    app.post("/api/user/new", UserController.createNewUser);
    app.get("/api/users", UserController.findAllUsers);
    app.get('/api/ratings', RatingController.findAllRatings);
    app.get('/api/rating/movie/:id', RatingController.findRatingsByMovie);
    app.get("/api/user/:id", UserController.findOneUser);   
    app.post('api/login', UserController.login);
    app.delete('/api/rating/:id', RatingController.deleteRating); 
}