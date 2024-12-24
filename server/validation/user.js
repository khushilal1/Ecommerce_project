
//rules for validation
const { check } = require("express-validator")

const registrationValidator = [
    check("name").trim().notEmpty().withMessage("Name is missing").isLength({ min: 3 }).withMessage("Name must have at least 3 character").isLength({ max: 31 }).withMessage("Name must have at most 31 character"),
    check("email").trim().notEmpty().withMessage("email is missing").isEmail().withMessage("Not a valid email"),
    check("address").trim().notEmpty().withMessage("address is missing").isLength({ min: 3 }).withMessage("Address must have at least 3 character").isLength({ max: 31 }).withMessage("Address must have at most 31 character"),
    check("password").trim().notEmpty().withMessage("password is missing").isLength({ min: 3 }).withMessage("password must have at least 3 character").isLength({ max: 31 }).withMessage("password must have at most 31 character"),
]



const loginValidator = [
    check("email").trim().notEmpty().withMessage("email is missing").isEmail().withMessage("Not a valid email"),
    check("password").trim().notEmpty().withMessage("password is missing").isLength({ min: 3 }).withMessage("password must have at least 3 character").isLength({ max: 31 }).withMessage("password must have at most 31 character"),
]


module.exports = { registrationValidator, loginValidator }