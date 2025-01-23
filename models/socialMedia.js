const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema({
    isActive: {
        type: Boolean,
        required: true
    },
    social_media_name: {
        type: String,
        required: true
    },
    social_link: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const Social = mongoose.model('Social', socialMediaSchema);

module.exports = Social