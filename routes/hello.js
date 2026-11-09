const express = require("express");
const router = express.Router();

// Gọi middleware từ thư mục middleware
const verifyToken = require("../middleware/verifyToken");

// API Hello World (GET /api/hello/)
router.get("/", verifyToken, (req, res) => {
    res.status(200).json({
        message: `Hello World! Xin chào người dùng: ${req.user.UserName}`
    });
});

module.exports = router;