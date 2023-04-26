const Rating = require("../models/rating.model");

module.exports = {

    createNewRating: (req, res) => {
        Rating.create(req.body)
        .then((newRating) => {
            console.log(newRating);
            res.json(newRating);
        })
        .catch((err) => {
            console.log("Something went wrong when creating one");
            res.status(400).json(err);
        });
    },

    findAllRatings: (req, res) => {
        Rating.find({})
            .then((ratings) => {
                console.log(ratings)
                res.status(200).json(ratings)
            }).catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    findRatingsByUser: (req, res) => {
        Rating.find({user_id: req.body})
        .then((allRatings) => {
            console.log(allRatings);
            res.json(allRatings);
        })
        .catch((err) => {
            console.log("findAllRatings has failed");
            res.json({ message: "Something went wrong in findAllRatings", error: err });
        });
    },

    findRatingsByMovie: (req, res) => {
        Rating.find({movie_id: req.params.id})
            .then((ratings) => {
                console.log(ratings)
                res.status(200).json(ratings)
            }).catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    deleteRating: (req, res) => {
        Rating.deleteOne({ _id: req.params.id })
        .then((deletedRating) => {
            console.log(deletedRating);
            res.json(deletedRating);
        })
        .catch((err) => {
            console.log("delete one failed");
            res.json({ message: "Something went wrong when deleting one" });
        });
    },

    findOneRating: (req, res) => {
        Rating.findOne({ _id: req.params.id })
        .then((oneRating) => {
            console.log(oneRating);
            res.json(oneRating);
        })
        .catch((err) => {
            console.log("find one failed");
            res.json({ message: "Something went wrong when finding one" });
        });
    },

    updateRating: (req, res) => {
        Rating.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        )
        .then((updatedRating) => {
            console.log(updatedRating);
            res.json(updatedRating);
        })
        .catch((err) => {
            console.log("Something went wrong when updating");
            res.status(400).json(err);
        });
    }
};