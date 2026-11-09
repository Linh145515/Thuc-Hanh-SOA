const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Gọi middleware từ thư mục middleware
const verifyToken = require("../middleware/verifyToken");

// Giả lập Database người dùng
let users = [
    {
        IdUser: 1,
        UserName: "admin",
        Password: "21232f297a57a5a743894a0e4a801fc3", // Mật khẩu MD5
        Token: null
    }
];

// API Đăng nhập (POST /api/)
router.post("/", (req, res) => {
    const { userName, password } = req.body;
    const user = users.find(u => u.UserName === userName && u.Password === password);

    if (!user) {
        return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
    }

    // Sinh JWT
    const token = jwt.sign(
        { IdUser: user.IdUser, UserName: user.UserName },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    user.Token = token;

    res.status(200).json({
        message: "Đăng nhập thành công!",
        token: token
    });
});

// API Xác thực Token (GET /api/auth)
router.get("/auth", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Xác thực Token thành công!",
        userInfo: req.user 
    });
});

module.exports = router;