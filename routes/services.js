const Services = require("../models/serviceSchema");
const upload = require("../config/multer");
const router = require("../config/express-router");


// GET REQUEST 
router.get('/services', async (req, res) => {
    try {
        const services = await Services.find({}).sort({ _id: -1 });

        return res.status(200).json({
            success: true,
            message: services
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})


// POST REQUEST
router.post('/services', upload.single('service_image'), async (req, res) => {
    try {
        const { service_title, service_text, service_icon } = req.body;

        if (!req.file) {
            return res.status(404).json({
                success: false,
                message: "Image must be a file"
            })
        }
        const newService = new Services({
            service_text,
            service_title,
            service_icon,
            service_image: req.file.path
        })

        await newService.save();
        res.status(200).json({
            success: true,
            message: newService
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
        
    }
})


// PUT REQUEST
router.put('/service/:id', async (req, res) => {
    try {
        const itemToEdit = await Services.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!itemToEdit) {
            return res.status(404).json({
                success: false,
                message: "No item with the id"
            })
        }
        res.status(200).json({
            success: true,
            message: "Edited successfully...",
            data: itemToEdit
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

// DELETE REQUEST
router.delete('/service/:id', async (req, res) => {
    try {
        const itemToDelete = await Services.findByIdAndDelete(req.params.id);

        if (!itemToDelete) {
            return res.status(404).json({
                success: false,
                message: "No item with the id"
            })
        }
        res.status(200).json({
            success: true,
            message: "Deleted successfully...",
            data: itemToDelete
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})
module.exports = router;