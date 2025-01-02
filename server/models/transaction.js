const mongoose = require("mongoose");
const { Schema, model } = require("mongoose")

const transactionSchema = new mongoose.Schema({
    //for storing the transaction id
    transactionId: { type: String, required: true, unique: true },
    //for storing the status of the transaction
    status: { type: String, required: true },
    //for storing the amount of the trsaction has done

    amount: { type: String, required: true },
    //for storing the method of payment

    // paymentMethod: { type: String, required: true },
    //for storing thebdatta of trsaction is created
    createdAt: { type: Date, required: true },
    //for storing te cudtomer detail who has created the transaction

    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    }
});



const Transaction = mongoose.model("Transaction", transactionSchema)
//exporting the user model
module.exports = { Transaction }

