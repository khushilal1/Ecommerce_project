const express = require('express');
const { userRegister, activateAccount, loginUser, forgetPassword, resetPassword, updateUser, loadProtected } = require('../controllers/user');
const userRoute = express.Router()
const runValidation = require('../validation/index');
const { registrationValidator, loginValidator } = require('../validation/user');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const formidableMiddleware = require("express-formidable")




//before the validation ,we may use the two middleware for validating the user before storing the user in databases
userRoute.post("/register", registrationValidator, runValidation,
    userRegister)




//for account activation
userRoute.post("/account-activation", activateAccount)
//for login 
userRoute.post("/login", loginValidator, runValidation, loginUser)

//for the forget password for sending the email for rsert lik
userRoute.post("/forget-password", forgetPassword)
//for reset the passowrd for updating te password
userRoute.post("/reset-password", resetPassword)

//for update the user profile on the basis of user id and formidableMIddleware is a function
userRoute.put("/update", isLoggedIn, formidableMiddleware(), updateUser)










userRoute.get("/loginCheck", isLoggedIn, (req, res) => {

    return res.json({ success: true })


})




//for checkign the user is admin and lpoggeed in
userRoute.get("/adminCheck", isLoggedIn, isAdmin, (req, res) => {


    return res.send({ sucess: true })
})
//for the protected route as only the admin ca acess some route
userRoute.post("/protected", isLoggedIn, isAdmin, loadProtected)

////////for the 


module.exports = { userRoute }