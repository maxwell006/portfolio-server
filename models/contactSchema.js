const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Contact', contactSchema);