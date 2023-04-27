const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {

    findAllUsers: (req, res) => {
        User.find({})
        .then((allUsers) => {
            console.log(allUsers);
            res.json(allUsers);
        })
        .catch((err) => {
            console.log("findAllUsers has failed");
            res.json({ message: "Something went wrong in findAllUsers", error: err });
        });
    },

    createNewUser: (req, res) => {
        User.create(req.body)
        .then((newUser) => {
            console.log(newUser);
            res.json(newUser);
        })
        .catch((err) => {
            console.log("Something went wrong when creating one");
            res.status(400).json(err);
        });
    },

    deleteOneUser: (req, res) => {
        User.deleteOne({ _id: req.params.id })
        .then((deletedUser) => {
            console.log(deletedUser);
            res.json(deletedUser);
        })
        .catch((err) => {
            console.log("delete one failed");
            res.json({ message: "Something went wrong when deleting one" });
        });
    },

    
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user === null) {
                return res.sendStatus(400);
            }
        
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return res.sendStatus(400);
            }
        
            const userToken = jwt.sign({
                id: user._id
            }, process.env.FIRST_SECRET_KEY);
        
            res
                .cookie("usertoken", userToken, {
                httpOnly: true
                })
                .json({ msg: "success!", user: user });
            } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            }
        },


    findOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
        .then((oneUser) => {
            console.log(oneUser);
            res.json(oneUser);
        })
        .catch((err) => {
            console.log("find one failed");
            res.json({ message: "Something went wrong when finding one" });
        });
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        )
        .then((updatedUser) => {
            console.log(updatedUser);
            res.json(updatedUser);
        })
        .catch((err) => {
            console.log("Something went wrong when updating");
            res.status(400).json(err);
        });
    }
};