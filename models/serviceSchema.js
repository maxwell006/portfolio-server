const mongoose = require("mongoose");

const services = mongoose.Schema(
    {
        service_image: {
            type: String,
            required: true
        },
        service_title: {
            type: String,
            required: true
        },
        service_text: {
            type: String,
            required: true
        },
        service_icon: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Services = mongoose.model('Service', services)

module.exports = Services