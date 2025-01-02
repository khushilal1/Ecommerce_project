
const getAllOrders = async (req, res) => {

    try {
        console.log("getting order")

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}


module.exports = { getAllOrders }