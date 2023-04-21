const Movie = require("../models/movie.model");

module.exports = {

    findAllMovies: (req, res) => {
        Movie.find({})
        .then((allMovies) => {
            console.log(allMovies);
            res.json(allMovies);
        })
        .catch((err) => {
            console.log("findAllMovies has failed");
            res.json({ message: "Something went wrong in findAllMovies", error: err });
        });
    },

    createNewMovie: (req, res) => {
        Movie.create(req.body)
        .then((newMovie) => {
            console.log(newMovie);
            res.json(newMovie);
        })
        .catch((err) => {
            console.log("Something went wrong when creating one");
            res.status(400).json(err);
        });
    },

    deleteOneMovie: (req, res) => {
        Movie.deleteOne({ _id: req.params.id })
        .then((deletedMovie) => {
            console.log(deletedMovie);
            res.json(deletedMovie);
        })
        .catch((err) => {
            console.log("delete one failed");
            res.json({ message: "Something went wrong when deleting one" });
        });
    },

    findOneMovie: (req, res) => {
        Movie.findOne({ _id: req.params.id })
        .then((oneMovie) => {
            console.log(oneMovie);
            res.json(oneMovie);
        })
        .catch((err) => {
            console.log("find one failed");
            res.json({ message: "Something went wrong when finding one" });
        });
    },

    updateMovie: (req, res) => {
        Movie.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        )
        .then((updatedMovie) => {
            console.log(updatedMovie);
            res.json(updatedMovie);
        })
        .catch((err) => {
            console.log("Something went wrong when updating");
            res.status(400).json(err);
        });
    }

};