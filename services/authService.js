const crypto = require("crypto");

// Tai khoan mau de kiem thu
const users = [
    {
        idUser: 1,
        userName: "admin",
        password: "123456"
    }
];

// Ham ma hoa MD5, phuc vu bai thuc hanh
function md5(value) {
    return crypto
        .createHash("md5")
        .update(value)
        .digest("hex");
}

// Kiem tra tai khoan va mat khau
function checkLogin(userName, password) {
    const user = users.find(
        (item) => item.userName === userName
    );

    if (!user) {
        return null;
    }

    // Ho tro client gui password dang Base64
    let decodedPassword;

    try {
        decodedPassword = Buffer
            .from(password, "base64")
            .toString("utf8");
    } catch (error) {
        return null;
    }

    // So sanh mat khau sau khi giai ma Base64
    if (decodedPassword !== user.password) {
        return null;
    }

    return {
        idUser: user.idUser,
        userName: user.userName
    };
}

module.exports = {
    checkLogin,
    md5
};
