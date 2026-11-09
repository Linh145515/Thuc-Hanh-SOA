const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Lay token tu header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Ban chua cung cap token"
        });
    }

    const token = authHeader.split(" ")[1];

    // Xac thuc token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token khong hop le hoac da het han"
            });
        }

        // Luu thong tin nguoi dung vao request
        req.user = decoded;

        // Cho phep di tiep den API
        next();
    });
}

module.exports = verifyToken;
