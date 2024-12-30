const express = require('express');
const categoryRoute = express.Router()
const runValidation = require('../validation/index');
const { createCategory, getSingleCategory, getAllCategories, updateCategory, deleteCategory, searchCategory } = require("../controllers/category")
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { categoryValidator } = require('../validation/category');


//for the protected route as only the admin ca acess to create the category
categoryRoute.post("/categories", categoryValidator, runValidation, isAdmin, createCategory)

// for the getting the  all category by any one that may be user or admin and no need to loggedIn  to our system.
categoryRoute.get("/categories/", getAllCategories)


//for the getting the  single category on the basis of slug name and no need to loggedin or admin
categoryRoute.get("/categories/:slug", getSingleCategory);





//for the updating the category,the user must be the admin,No other user can update the category
categoryRoute.put("/categories/:categoryId", categoryValidator, runValidation, isLoggedIn, isAdmin, updateCategory)




//for having the category search,no need of the admin or loggedIn
categoryRoute.post("/categories/search/:searchValue", searchCategory)




module.exports = { categoryRoute }