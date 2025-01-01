const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/auth');
const { createProduct, getProducts, getSingleProducts, getPhotoProduct, deleteProduct, updateProduct, countProduct, getProductsSpecific, searchProducts, getBrainTreeToken, processBraintreePayment, filterProductPriceRange } = require('../controllers/product');
const productRoute = express.Router()
const formidableMiddleware = require("express-formidable")


//the product route
//creating the product if the user is admin and loggedIn
productRoute.post("/products", isLoggedIn, isAdmin, formidableMiddleware(), createProduct)



//getting all the product need not be admin and loggedIn
productRoute.get("/products", getProducts)




//getting all the product or product accordign to pagination
productRoute.get("/products/query", isLoggedIn, getProductsSpecific)

//getting the single product if the user is admin and loggedIn
productRoute.get("/products/:slug", getSingleProducts)
//for gettig the photo only of the products,only loggedIn is required
productRoute.get("/products/photo/:productId", isLoggedIn, getPhotoProduct)
//for deleting the product as is loggedin and isAdmin is required
productRoute.delete("/products/:productId", isLoggedIn, isAdmin, deleteProduct)

//for updating the product
productRoute.put("/products/:productId", formidableMiddleware(), isLoggedIn, isAdmin, updateProduct)

//for having the product count
productRoute.get("/products-count", countProduct)


//for having the product search
productRoute.post("/products/search/:searchValue", searchProducts)




//for filterig the product on the basis of the price range
productRoute.get("/products/filter/price-range", filterProductPriceRange)
//













module.exports = { productRoute }