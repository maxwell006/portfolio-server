const mongoose = require("mongoose");

const heroPageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('HeroPage', heroPageSchema);
