const Router = require("express")
const { getAllOrders } = require("../controllers/order")
const { isLoggedIn } = require("../middlewares/auth")

const orderRoute = Router()
//inroder to create the order,the user have to loggedin first

orderRoute.get("/orders",isLoggedIn, getAllOrders)


module.exports = { orderRoute }