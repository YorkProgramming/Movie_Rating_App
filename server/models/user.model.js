const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true, 
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        fav_movie: String,
        reviews_made: Number,
    }, 
    { timestamps: true }
);

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
    this.password = hash;
    next();
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;