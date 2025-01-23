const express = require("express");
const router = express.Router();
const Projects = require("../models/projectSchema");
const upload = require("../config/multer");


// GET REQUEST
router.get("/projects", async (req, res) => {
    try {
        const project = await Projects.find({});

        return res.status(200).json({
            success: true,
            message: project
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
});

// GET ONE ITEM
router.get('/project/:id', async (req, res) => {
    try {
        const item = await Projects.findById(req.params.id);

        if (!item) {
            res.status(400).json({
                success: false,
                message: "No item with that id found..."
            })
        }
        return res.status(200).json({
            success: true,
            message: item
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Interval server error"
        })
    }
})

// POST REQUEST
router.post('/projects', upload.single('project_image'), async (req, res) => {
    try {
        const { project_title, project_link, project_text } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Bad request, image must be a file"
            })
        }
        const newProject = new Projects({
            project_title,
            project_link,
            project_text,
            project_image: req.file.path
        })

        await newProject.save()
        return res.status(201).json({
            success: true,
            message: "Created successfully",
            data: newProject
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
})

// PUT ROUTE
router.put('/project/:id', upload.single('project_image'), async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            ...(req.file && { project_image: req.file.path })
        };
        const itemToEdit = await Projects.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!itemToEdit) {
            return res.status(404).json({
                success: false,
                message: "No item found"
            });
        }

        return res.status(200).json({
            success: true,
            data: itemToEdit,
            message: "Edited successfully"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


// DELETE ROUTE
router.delete('/project/:id', async (req, res) => {
    try {
        const itemToDelete = await Projects.findByIdAndDelete(req.params.id);

        if (!itemToDelete) {
            return res.status(404).json({
                success: false,
                message: "No item found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Deleted successfully",
            data: itemToDelete
        })
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})
module.exports = router;