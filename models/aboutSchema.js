const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    nick_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    languages: {
        type: [String],
        required: true
    },
    years_of_experience: {
        type: Number,
        required: true
    },
    happy_clients: {
        type: Number,
        required: true
    },
    projects_completed: {
        type: Number,
        required: true
    },
    awards_won: {
        type: Number,
        required: false
    },
    practiced: {
        type: Number,
        required: true,
    }

},
    {
        timestamps: true
    })

const About = mongoose.model('About', aboutSchema);

module.exports = About