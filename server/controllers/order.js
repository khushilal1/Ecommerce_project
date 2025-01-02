const { Order } = require("../models/order");



//for getting all the created order
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("products", "-photo")
            .populate("buyer", "name");
        //return the created order 

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
};

//for creating order

const createOrders = async (req, res) => {

    try {

        console.log("order created")





        
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}




module.exports = { getAllOrders, createOrders }