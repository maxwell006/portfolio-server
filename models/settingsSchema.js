const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
    primary_color: {
        type: String,
        required: false
    },
    bg_color: {
        type: String,
        required: false
    },
    box_color: {
        type: String,
        required: false
    },
    text_color: {
        type: String,
        required: false
    },
    seo_name: {
        type: String,
        required: false
    },
    seo_description: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const Settings = mongoose.model('Setting', settingsSchema);
module.exports = Settings;