const express = require("express");
const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.send("This is a test route.");
});

module.exports = router;
