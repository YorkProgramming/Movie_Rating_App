const User = require("../models/user.model");

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

    login: (async(req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            user: user,
            token: generateToken(user._id)})
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
    }),

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