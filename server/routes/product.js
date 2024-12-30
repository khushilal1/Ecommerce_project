const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { createProduct, getProducts, getSingleProducts, getPhotoProduct, deleteProduct, updateProduct, countProduct, getProductsSpecific, searchProducts, getBrainTreeToken ,processBraintreePayment} = require('../controllers/product');
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
productRoute.post("/products/search/:searchValue", isLoggedIn, searchProducts)




//payment route
//this is route which doesnot required any middle ware for showing the deatil or creating the token
productRoute.get("/braintree/token", getBrainTreeToken)


//for processing the token
productRoute.post("/braintree/payment", processBraintreePayment)



module.exports = { productRoute }