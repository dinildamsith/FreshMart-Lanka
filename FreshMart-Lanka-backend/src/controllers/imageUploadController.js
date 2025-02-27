const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the dynamically created directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
    },
});

const upload = multer({ storage });

// POST route for file upload
router.post("/image/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const fileURL = `${req.protocol}://${req.get("host")}/fresh-mart/api/v1/uploads/${req.file.filename}`;
    res.json({ message: "Image uploaded successfully!", fileURL });
});

// GET route to fetch an image by filename
router.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;

    // Check if the file exists in the 'uploads' folder
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Image not found." });
    }

    // Send the file as a response
    res.sendFile(filePath);
});

module.exports = router;


