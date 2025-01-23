const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        project_image: {
            type: String,
            required: true
        },
        project_text: {
            type: String,
            required: true
        },
        project_title: {
            type: String,
            required: true
        },
        project_link: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Projects = mongoose.model('Project', projectSchema);

module.exports = Projects;