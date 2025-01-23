const Settings = require('../models/settingsSchema');
const express = require('express');
const router = express.Router();

router.post('/settings', async (req, res) => {
    try {
        const { primary_color, bg_color, text_color, box_color, seo_name, seo_description, name } = req.body;
        const newSettings = new Settings({
            primary_color,
            bg_color,
            text_color,
            box_color,
            seo_description,
            seo_name,
            name
        })
        await newSettings.save();
        res.status(201).json({ message: "Uploaded successfully", success: true });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
        console.log(err);

    }
})

router.get('/settings', async (req, res) => {
    try {
        const settings = await Settings.find({});
        res.status(200).json(settings);
    }
    catch (err) {
        res.status(400).json("Internal Server Error")
    }
})

router.get('/settings/:id', async(req, res) => {
    try{
        const setting = await Settings.findById(req.params.id);
        if(!setting){
            res.status(400).json({message: "Item not found"})
        }
        res.status(200).json({message: setting})
    }
    catch (err){
        console.log(err)
    }
})
router.delete('/settings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteItem = await Settings.findByIdAndDelete(id);
        res.status(200).json({
            message: "Deleted successfully",
            data: deleteItem
        })
    } catch (error) {
        res.status(500).json("Internal server error")
        console.error(error);

    }
})

router.put('/settings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateItem = req.body;
        const updatedData = await Settings.findByIdAndUpdate(id, updateItem, { new: true })
        if (!updatedData) {
            return res.status(400).json({ message: "Not item found" })
        }
        res.status(200).json({
            message: 'Updated successfully',
            data: updatedData
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal server error");
    }
})
module.exports = router;