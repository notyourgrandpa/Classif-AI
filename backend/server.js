const express = require("express");
const multer = require("multer");
const cors = require("cors");
const gcsService = require("./gcsService");

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "./enhanced-medium-399012-442ff26cce76 (1).json";
const app = express();
const port = process.env.PORT || 3000;

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());

gcsService.checkGCSConnection();

// Define your route for handling file uploads
app.post("/upload", upload.single("image"), async (req, res) => {
  // Check if a file is present
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Access the file buffer
  const imageData = req.file.buffer;

  // Determine the destination folder based on the imageType
  const imageType = req.body.imageType || "ai"; // Default to "ai" if not provided
  const destinationFolder = `user_upload/${imageType}`;

  try {
    // Save the file to the destination folder
    await gcsService.uploadFile(imageData, destinationFolder);

    // Respond with a success message
    res.json({ success: true, message: "Upload successful" });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, this is your server!");
});
