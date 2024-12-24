const jwt = require("jsonwebtoken")
const { dev } = require("../config/index")
const { User } = require("../models/user")

//middleware for checking 
const isLoggedIn = (req, res, next) => {

    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No token found" })
        }
        //verifying the token
        const token = req.headers.authorization
        const decode = jwt.verify(token, dev.secretKey.jwtSecretKey)
        console.log(decode._id);
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
        const existingUser = await User.findById({ _id: req.userId })
        console.log(existingUser);

        if (!existingUser) {
            return res.status(400).json({ error: "User Not found.Please login first" })
        }

        //cheking the user is admin or not
        if (existingUser.isAdmin !== 1) {
            return res.status(401).json({ error: "Your are not admin" })
        }
        next();

    }




    catch (error) {
        res.status(401).send({ message: error.message })
    }


}

module.exports = { isLoggedIn, isAdmin }