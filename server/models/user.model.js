const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
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
            bcrypt: true,
            min: 6,
        },
        ratings: []
    }, 
    { timestamps: true }
);

UserSchema.plugin(require(('mongoose-bcrypt')))

module.exports = mongoose.model("User", UserSchema);