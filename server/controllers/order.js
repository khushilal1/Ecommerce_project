const { Order } = require("../models/order");
const { User } = require("../models/user");
const { processBraintreePayment } = require("./payment");
const { sendOrderEmail } = require("../utility/sendOrderEmail")


//for getting all the created order
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().select({ payment: 0, buyer: 0, _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        // //return the created order 
        if (orders.length < 1) {
            return res.send({ message: "No order is found" })
        }

        return res.status(200).json({ orders: orders });
    } catch (error) {
        return res.status(400).send({
            message: error.message,
        });
    }
};




//for the order creation
const createOrders = async (req, res) => {
    try {
        // Extracting details from the request body
        const { payment_method } = req.body;
        let { cartItems } = req.body;

        // Validate the input data
        if (!payment_method || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Parse cartItems if it comes as a string
        if (typeof cartItems === "string") {
            cartItems = JSON.parse(cartItems);
        }

        // Calculate the total amount of the cart

        let totalAmount = 0
        cartItems.forEach((item) => {
            totalAmount = totalAmount + item.amount * item.quantity

        })
        console.log(totalAmount)





        // Process payment using the payment method
        const transaction = await processBraintreePayment(
            req,
            res,
            payment_method,
            totalAmount,
            req.userId
        );
        //checking the transaction
        if (!(transaction.success === true)) {
            return res.status(400).json({ message: "Payment processing failed" });
        }


        // console.log(transaction.success)

        // // Save the order details to the database
        const newOrder = new Order({
            products: cartItems.map((item) => ({
                product: item.productId,
                quantity: item.quantity,
                amount: item.amount,
            })),
            payment: {
                transactionId: transaction.transactionId,
                status: transaction.status,
                amount: transaction.amount,
                createdAt: transaction.createdAt,
            },
            buyer: req.userId,
            status: "Not processed", // Initial status
        });

        // Save the new order to the database
        await newOrder.save();
        console.log("Order Created Successfully:", newOrder);

        //GETTING THE DATA
        const userData = await User.findById({ _id: req.userId })

        // console.log(userData)

        // // Send confirmation email to the user
        await sendOrderEmail(userData.email, newOrder)

        // // Send success response
        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder.products,

        });

    } catch (error) {
        console.error("Error in createOrders:", error.message);
        return res.status(500).json({ message: error.message });
    }
};


//

module.exports = { getAllOrders, createOrders }