
const braintree = require("braintree");
const { dev } = require("../config");
const { User } = require("../models/user");
const { Transaction } = require("../models/Transaction");

//initlaization of the payment integration
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: dev.paymentKey.braintreeMerchantId,
    publicKey: dev.paymentKey.braintreePublicKey,
    privateKey: dev.paymentKey.braintreePrivateKey,
});



//for creating token for the payment integration and pass to frontend
const getBrainTreeToken = async (req, res) => {

    try {

        // console.log(gateway)
        const braintreeToken = await gateway.clientToken.generate({})
        //priting the token
        console.log(braintreeToken)
        //checking the  tokne is generated or not
        if (!braintreeToken) {
            return res.status(401).send({ message: "Token not generated" })
        }
        //calling the fucntion


        return res.status(200).send({ braintreeToken: braintreeToken })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}


//for processing of the payment
const processBraintreePayment = async (req, res, payment_method_nonce, amount, userId) => {

    try {


        // const { payment_method_nonce, amount } = req.body
        // console.log(req.body)
        //checking the payment method is valid or n
        if (!payment_method_nonce || !amount) {
            return ({ success: false, message: "Invalid payment details" })
        }

        //getting the user data
        const userData = await User.findOne({ _id: userId })
        //checking the order

        if (!userData) {
            return ({ success: true, message: "User not found" });
        }


        //making the transaction
        const paymentResult = await gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: payment_method_nonce,
            customer: {

                firstName: userData.name,
                email: userData.email,

            },
            options: {
                submitForSettlement: true
            }
        })


        // Check if payment was successful
        if (!paymentResult.success) {
            return ({ success: false, message: "Payment failed" })
        }





        // //getting the transaction id

        const transactionId = paymentResult.transaction.id
        if (!transactionId) {
            return ({ success: false, message: "Transaction ID is required." });
        }




        // //getting the detail of transaction
        const transaction = await gateway.transaction.find(transactionId);



        // //saving the data of the transaction id
        const newTransaction = await new Transaction({

            transactionId: transaction.id,
            status: transaction.status,
            amount: transaction.amount,
            createdAt: transaction.createdAt,
            customer: {
                name: transaction.customer.firstName,
                email: transaction.customer.email
            }


        })
        //checking thw newTransation is saved or not
        if (!newTransaction) {
            return ({ success: false, message: "The trasaction is not created!" })
        }

        //saving to database
        await newTransaction.save()
        //checking for the settlement
        console.log("Trasaction saved successfully")
        // return newTransaction;
        return ({ success: true, message: "Transaction Successfull", newTransaction: newTransaction })
    }


    catch (error) {
        return { message: error.message }
    }


}



//make the report of saved data about the payment
const reportGenerate = async (req, res) => {

    try {
        console.log("report generate")


    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}

module.exports = { getBrainTreeToken, processBraintreePayment, reportGenerate }