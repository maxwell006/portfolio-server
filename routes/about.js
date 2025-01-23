const About = require("../models/aboutSchema");
const express = require("express");
const router = express.Router();

// POST REQUEST
router.post('/about', async (req, res) => {
    try {
        const { location, nick_name, email, practiced, languages, years_of_experience, happy_clients, awards_won, projects_completed } = req.body;
        const newAboutDetails = new About({
            location,
            nick_name,
            email,
            practiced,
            languages,
            years_of_experience,
            happy_clients,
            awards_won,
            projects_completed
        })

        await newAboutDetails.save();
        res.status(201).json({
            message: "Uploaded successfully",
            items: newAboutDetails
        })
    } catch (err) {
        console.error("My error is", err);
        res.status(500).json({
            message: "Internal server error",
        })

    }
});


// GET REQUEST
router.get('/about', async (req, res) => {
    try {
        const about = await About.find({}).sort({ _id: -1 });
        res.status(200).json({
            message: "Success",
            items: about
        });        

    } catch (error) {
        console.error("Error is", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
})
router.get('/about/:id', async (req, res) => {
    try {
        const aboutItem = await About.findById(req.params.id);
        if (!aboutItem) {
            res.status(400).json({
                message: "Item not found"
            })
        }
        res.status(200).json({
            result: { data: aboutItem },
            message: "success"
        })
    } catch (error) {
        console.error("My error is: ", error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

// UPADATE REQUEST 
router.put('/about/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const editItem = req.body;
        const editItemUpdate = await About.findByIdAndUpdate(id, editItem, { new: true });
        if (!editItemUpdate) {
            return res.status(404).json({
                message: "This item doesn't exist"
            })
        }
        res.status(200).json({
            message: 'Updated successfully',
            data: editItemUpdate
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error."
        });
    }
})

// DELETE REQUEST
router.delete('/about/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await About.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ message: "No item found" });
        }

        res.status(200).json({
            message: "Deleted successfully...",
            data: deletedData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error."
        });
    }
});

module.exports = router;                                                                                                                                                                