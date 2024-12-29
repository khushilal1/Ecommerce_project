const jwt = require("jsonwebtoken")
const { dev } = require("../config/index")

//for the verification  of token provided at the accooutn activation time
const tokenVerify = async (token, res) => {
    try {
        // Verify the token
        return jwt.verify(token, dev.secretKey.jwtSecretKey);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Handle the token expiration case
            res.status(401).send({ message: 'Token has expired. Please log in again.' });
        } else {
            // Handle other errors
            res.status(500).send({ message: error.message });
        }
    }
};




module.exports = { tokenVerify }