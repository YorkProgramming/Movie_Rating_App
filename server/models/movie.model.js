const mongoose = require("mongoose");

    const MovieSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, "A movie's title is required"],
            maxlength: [30, "The title's length can be no more than 30 characters"]
        },
        genre: {
            type: String,
            required: [true, "A movie's genre is required"],
        },
        rating: {
            type: Number,
            required: [true, "A movie's rating is required"],
            min: [1, "The rating must be at least 1"],
            max: [10, "The rating must be no more than 10"]
        },
        review: {
            type: String,
            required: [true, "A movie's review is required"],
            maxlength: [100, "The review's length can be no more than 100 characters"] 
        },
    }, { timestamps: true })

	
	const Movie = mongoose.model('Movie', MovieSchema);

	module.experts = Movie;
