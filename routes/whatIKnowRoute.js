const router = require("../config/express-router");
const upload = require("../config/multer");
const whatIKnow = require("../models/whatIKnowSchema");

// GET REQUEST
router.get("/technologies", async (req, res) => {
  try {
    const technologies = await whatIKnow.find({});
    return res.status(200).json({
      success: true,
      data: technologies,
    });
  } catch (err) {
    console.error("My error", err);
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
});

// POST REQUEST
router.post("/technologies", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      console.error("Bad request, image must be a file");
      return res.status(400).json({
        success: false,
        message: "Bad request, image must be a file",
      });
    }
    const newTechnology = new whatIKnow({
      title,
      image: req.file.path,
    });

    await newTechnology.save();
    return res.status(201).json({
      success: true,
      data: newTechnology,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// PUT REQUEST
router.put("/technologies/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      ...(req.file && { image: req.file.path }),
    };
    const itemToEdit = await whatIKnow.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!itemToEdit) {
      console.log("Item not found");
      return res.status(400).json({
        message: "No item found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Item edited successfully",
        data: itemToEdit,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// DELETE REQUEST
router.delete("/technologies/:id", async (req, res) => {
  try {
    const itemToDelete = await whatIKnow.findByIdAndDelete(req.params.id);
    if (!itemToDelete) {
      return res.status(400).json({
        success: false,
        message: "No item found ...",
      });
    } else {
      res.status(200).json({
        success: false,
        message: `Item with ${req.params.id} deleted successfully`,
        item: itemToDelete,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


module.exports = router;
