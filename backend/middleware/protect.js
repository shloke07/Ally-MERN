const jwt = require("jsonwebtoken");

const protect = async (req) => {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.authToken;
        if (token) {
            jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(userData);
                }
            });
        }
        else {
            reject("No token");
        }

    });
}

module.exports = protect;