require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Cho phep doc du lieu JSON tu request body
app.use(express.json());

// Nap cac Router
const authRouter = require("./routes/auth");
const helloRouter = require("./routes/hello");

// API dang nhap va xac thuc token
app.use("/api", authRouter);

// API Hello World co Middleware bao ve
app.use("/api/hello", helloRouter);

// Khoi dong server
app.listen(PORT, () => {
    console.log(`Server dang chay tai http://localhost:${PORT}`);
});
