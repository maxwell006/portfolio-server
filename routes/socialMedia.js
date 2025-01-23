const Social = require("../models/socialMedia");
const express = require("express");
const router = express.Router();

// POST REQUEST
router.post('/socials', async (req, res) => {
    try {
        const { isActive, social_media_name, social_link } = req.body;

        const newSocial = new Social({
            isActive,
            social_media_name,
            social_link
        });

        await newSocial.save();
        res.status(201).json({
            message: "Uploaded successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error."
        });
    }
});

// PUT REQUEST
router.put('/socials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedSocial = await Social.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedSocial) {
            return res.status(404).json({ message: 'Social media entry not found' });
        }

        res.status(200).json({
            message: 'Updated successfully',
            data: updatedSocial
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error."
        });
    }
});

// DELETE
router.delete('/socials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await Social.findByIdAndDelete(id);

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
// GET ALL
router.get('/socials', async (req, res) => {
    try {
        const social = await Social.find({});
        res.status(200).json(social)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error."
        });
    }
})

// GET BY ID
router.get('/socials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const individualSocial = await Social.findById(id);
        res.status(200).json(individualSocial)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error."
        });
    }
})


module.exports = router;
