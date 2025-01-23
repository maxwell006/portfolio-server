const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const HeroPage = require("../models/heroSchema");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const ext = file.mimetype.split("/")[1];
    return {
      folder: "hero-section",
      public_id: `${file.fieldname}-${Date.now()}`,
      resource_type: "raw",
      format: ext,
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "text/csv" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type for resume. Only PDF, CSV, and DOCX are allowed."
        ),
        false
      );
    }
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});

router.post(
  "/upload-hero",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { description } = req.body;
      if (!req.files["image"] || !req.files["resume"]) {
        return res
          .status(400)
          .json({ success: false, message: "Files are required" });
      }
      const imageUpload = req.files["image"][0];
      const resumeUpload = req.files["resume"][0];
      const heroPage = new HeroPage({
        image: imageUpload.path,
        description,
        resume: resumeUpload.path,
      });

      await heroPage.save();

      return res
        .status(201)
        .json({ success: true, message: "Uploaded successfully", heroPage });
    } catch (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ success: false, message: "File too large" });
      }
      console.error("Error:", JSON.stringify(error, null, 2));
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message || error,
      });
    }
  }
);

router.get("/hero", async (req, res) => {
  try {
    const hero = await HeroPage.find({});
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get One Hero Item
router.get("/hero/:id", async (req, res) => {
  try {
    const heroPage = await HeroPage.findById(req.params.id);
    if (!heroPage) {
      return res.status(404).json({
        success: false,
        message: "No item found",
      });
    }
    res.status(200).json({ success: true, heroPage });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put(
  "/hero/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        ...(req.files?.image && { image: req.files.image[0].path }),
        ...(req.files?.resume && { resume: req.files.resume[0].path }),
      };

      const itemToEdit = await HeroPage.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!itemToEdit) {
        return res.status(404).json({
          success: false,
          message: "No item found",
        });
      }

      return res.status(200).json({
        success: true,
        data: itemToEdit,
        message: "Edited successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

router.delete("/hero/:id", async (req, res) => {
  try {
    const deleteItem = await HeroPage.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted successfuly",
      data: deleteItem,
    });
  } catch (error) {
    console.error("Your error is: ", error);
    res
      .status(500)
      .json({ message: "Internal server error", errorMessage: error });
  }
});
module.exports = router;
