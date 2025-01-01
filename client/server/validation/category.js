
//rules for validation
const { check } = require("express-validator")

const categoryValidator = [
    check("name").trim().notEmpty().withMessage("Name is missing").isLength({ min: 3 }).withMessage("Name must have at least 3 character").isLength({ max: 31 }).withMessage("Name must have at most 31 character"),
]





module.exports = { categoryValidator }