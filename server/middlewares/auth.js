const jwt = require("jsonwebtoken")
const { dev } = require("../config/index")
const { User } = require("../models/user")
const { Admin } = require("../models/admin")

//middleware for checking 
const isLoggedIn = (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No token found" })
        }
        //verifying the token
        const token = req.headers.authorization
        const decode = jwt.verify(token, dev.secretKey.jwtSecretKey)
        // console.log(decode._id);
        //assigning to the usr id
        req.userId = decode._id
        next()
    }





    catch (error) {
        res.status(401).send({ message: error.message })
    }


}

//cheking the user is admin or not

const isAdmin = async (req, res, next) => {

    try {


        //getting the token from the cookies
        const token = req.cookies.authToken;
        //checking the token is available or not
        if (!token) {
            return res.status(401).json({ message: "No token provided. Access denied." });
        }

        //verifying the token
        const decoded = jwt.verify(token, dev.secretKey.jwtSecretKey);

        //checkig the admin or not
        const admin = await Admin.findById(decoded._id);

        if (!admin) {
            return res.status(403).json({ message: "Access denied. Only admins can perform this action." });
        }
        req.admin = admin; // Attach the admin to the request object

        next();

    }

    catch (error) {
        res.status(401).send({ message: error.message })
    }


}



module.exports = { isLoggedIn, isAdmin }