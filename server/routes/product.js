const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/user');
const { createProduct, getProducts, getSingleProducts, getPhotoProduct, deleteProduct, updateProduct,countProduct ,getProductsSpecific,searchProducts} = require('../controllers/product');
const productRoute = express.Router()
const formidableMiddleware = require("express-formidable")


//the product route
//creating the product if the user is admin and loggedIn
productRoute.post("/products", isLoggedIn, isAdmin, formidableMiddleware(), createProduct)



//getting all the product need not be admin and loged in
productRoute.get("/products", isLoggedIn, formidableMiddleware(), getProducts)




//getting all the product or product accordign to pagination
productRoute.get("/products/query", isLoggedIn, getProductsSpecific)

//getting the single product if the user is admin and loggedIn
productRoute.get("/products/:slug", isLoggedIn, formidableMiddleware(), getSingleProducts)
//for gettig the photo only

productRoute.get("/products/photo/:productId", formidableMiddleware(), getPhotoProduct)
//for deleting the product as is loggedin and isAdmin is required
productRoute.delete("/products/:productId", isLoggedIn, isAdmin, deleteProduct)

//for updating the product
productRoute.put("/products/:productId", formidableMiddleware(), isLoggedIn, isAdmin, updateProduct)

//for having the product count
productRoute.get("/products-count", countProduct)


//for having the product search
productRoute.post("/products/search/:searchValue", isLoggedIn,searchProducts)

//






module.exports = { productRoute }