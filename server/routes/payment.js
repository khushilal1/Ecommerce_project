
const express = require('express');
const { isLoggedIn } = require('../middlewares/auth');
const { getBrainTreeToken, processBraintreePayment,reportGenerate } = require('../controllers/payment.js');
const paymentRoute = express.Router()





//payment route
//this is route which doesnot required any middle ware for showing the deatil or creating the token
paymentRoute.get("/braintree/create-token", isLoggedIn, getBrainTreeToken)


//for processing the token
paymentRoute.post("/braintree/process-payment", isLoggedIn, processBraintreePayment)






//for making the report of the saved data about the payment
paymentRoute.get("/braintree/report-generate",isLoggedIn, reportGenerate)


module.exports = { paymentRoute }