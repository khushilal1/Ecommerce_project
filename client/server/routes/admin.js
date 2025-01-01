const express = require('express');
const { adminRegister, activateAccount, forgetPassword, resetPassword, updateUser, loadProtected, loginAdmin, updateAdmin } = require('../controllers/admin');
const adminRoute = express.Router()
const runValidation = require('../validation/index');
const { registrationValidator, loginValidator } = require('../validation/user');
const { isLoggedIn } = require('../middlewares/auth');
const formidableMiddleware = require("express-formidable")




//before the validation ,we may use the two middleware for validating the user before storing the user in databases
adminRoute.post("/register", registrationValidator, runValidation,
    adminRegister)




// //for account activation

adminRoute.post("/account-activation", activateAccount)



// //for login 
adminRoute.post("/login", loginValidator, runValidation, loginAdmin)

// //for the forget password for sending the email for rsert lik
adminRoute.post("/forget-password", forgetPassword)
// //for reset the passowrd for updating te password
adminRoute.post("/reset-password", resetPassword)

// //for update the user profile on the basis of user id and formidableMIddleware is a function
adminRoute.put("/update", isLoggedIn, formidableMiddleware(), updateAdmin)

















module.exports = { adminRoute }