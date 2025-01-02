const Router = require("express")
const { getAllOrders,createOrders } = require("../controllers/order")
const { isLoggedIn } = require("../middlewares/auth")

const orderRoute = Router()


//in order to create the order,the user have to loggedin first
orderRoute.get("/orders", isLoggedIn,getAllOrders)


//create the order
orderRoute.post("/orders",createOrders)



module.exports = { orderRoute }