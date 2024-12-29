
//rules for validation
const { check } = require("express-validator")

const registrationValidator = [
    check("name").trim().notEmpty().withMessage("name is missing").isLength({ min: 3 }).withMessage("name must have at least 3 character").isLength({ max: 31 }).withMessage("username must have at most 30 character"),
    check("email").trim().notEmpty().withMessage("Email is missing").isEmail().withMessage("Not a valid email"),
    // check("address").trim().notEmpty().withMessage("Address is missing").isLength({ min: 3 }).withMessage("Address must have at least 3 character").isLength({ max: 31 }).withMessage("Address must have at most 30 character"),
    check("password").trim().notEmpty().withMessage("password is missing").isLength({ min: 3 }).withMessage("password must have at least 3 character").isLength({ max: 31 }).withMessage("password must have at most 30 character"),
]

//the login validator

const loginValidator = [
    check("email").trim().notEmpty().withMessage("email is missing").isEmail().withMessage("Not a valid email"),
    check("password").trim().notEmpty().withMessage("password is missing").isLength({ min: 3 }).withMessage("password must have at least 3 character").isLength({ max: 31 }).withMessage("password must have at most 31 character"),
]

//exporting the data
module.exports = { registrationValidator, loginValidator }