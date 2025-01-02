
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
const processBraintreePayment = async (req, res) => {

    try {


        const { payment_method_nonce, amount } = req.body
        // console.log(req.body)
        //checking the payment method is valid or n
        if (!payment_method_nonce) {
            return res.status(400).json({ message: "Invalid payment method" })
        }
        if (!amount) {
            return res.status(400).json({ message: "Amount is requred" })
        }
        //getting the user data
        const userData = await User.findOne({ _id: req.userId })
        //making the transaction
        const result = await gateway.transaction.sale({
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



        // geting the result of the transaction
        // console.log(result)
        // getting the transaction id
        //checking the transaction is successfull or not
        if (!result) {
            return res.status(401), send({ message: 'Transaction unsuccessfull' })
        }

        // //getting the transaction id

        const transactionId = result.transaction.id
        if (!transactionId) {
            return res.status(400).send("Transaction ID is required.");
        }

        // //getting the detail of transaction
        const transaction = await gateway.transaction.find(transactionId);



        // //saving the data of the transaction id
        const newTrasaction = await new Transaction({

            transactionId: transaction.id,
            status: transaction.status,
            amount: transaction.amount,
            createdAt: transaction.createdAt,
            customer: {
                name: transaction.customer.firstName,
                email: transaction.customer.email
            }


        })
        //saving to database
        await newTrasaction.save()
        //checking for the settlement
        // Schedule a check to update the status after settlement is complete

        return res.status(200).send({ message: "Transaction Successfull", newTrasaction: result })
    }

    catch (error) {
        res.status(500).send({ message: error.message })
    }


}




// // //for processing of the payment with card
// const processBraintreePayment = async (req, res) => {

//     try {

//         // //finding the user
//         const userData = await User.findById({ _id: req.userId })
//         // console.log(userData)

//         //getting the card detail for payment
//         const { cardNumber, expirationDate, cvv } = req.body;
//         // console.log(req.body)
//         // Create a customer for testing
//         const customerResult = await gateway.customer.create({
//             firstName: userData.name,
//             email: userData.email,
//         });

//         //checking if the customer is existed with the given detail
//         if (!customerResult.success) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Failed to create a customer.",
//             });
//         }
//         //getting customerId
//         const customerId = customerResult.customer.id;
//         // console.log(customerId)

//         // console.log(gateway)
//         const braintreeTokenClient = await gateway.clientToken.generate({})
//         // console.log(braintreeTokenClient.clientToken);

//         //getting all the detail about the card
//         // // Add a payment method using card details
//         const paymentMethodResult = await gateway.paymentMethod.create({
//             authorization: braintreeTokenClient.clientToken,
//             customerId: customerId,
//             creditCard: {
//                 number: cardNumber,
//                 expirationDate: expirationDate,
//                 cvv: cvv,
//             },

//         });


//         console.log(paymentMethodResult)






//         // const { payment_method_nonce, amount } = req.body
//         // // console.log(req.body)
//         // //checking the payment method is valid or n
//         // if (!payment_method_nonce) {
//         //     return res.status(400).json({ message: "Invalid payment method" })
//         // }
//         // if (!amount) {
//         //     return res.status(400).json({ message: "Amount is requred" })
//         // }

//         // //making the transaction
//         // const result = await gateway.transaction.sale({
//         //     amount: amount,
//         //     paymentMethodNonce: payment_method_nonce,
//         //     customer: {

//         //         firstName: userData.name,
//         //         email: userData.email,

//         //     },
//         //     options: {
//         //         submitForSettlement: true
//         //     }
//         // })



//         // // geting the result of the transaction
//         // // console.log(result)
//         // // getting the transaction id
//         // //checking the transaction is successfull or not
//         // if (!result) {
//         //     return res.status(401), send({ message: 'Transaction unsuccessfull' })
//         // }

//         // //getting the transaction id

//         // const transactionId = result.transaction.id
//         // if (!transactionId) {
//         //     return res.status(400).send("Transaction ID is required.");
//         // }

//         // //getting the detail of transaction
//         // const transaction = await gateway.transaction.find(transactionId);



//         // //saving the data of the transaction id
//         // const newTrasaction = await new Transaction({

//         //     transactionId: transaction.id,
//         //     status: transaction.status,
//         //     amount: transaction.amount,
//         //     createdAt: transaction.createdAt,
//         //     customer: {
//         //         name: transaction.customer.firstName,
//         //         email: transaction.customer.email
//         //     }


//         // })
//         // //saving to database
//         // // await newTrasaction.save()
//         // //checking for the settlement
//         // // Schedule a check to update the status after settlement is complete
//         // setTimeout(async () => {
//         //     try {
//         //         const updatedTransaction = await gateway.transaction.find(transactionId);
//         //         if (updatedTransaction.status === "settled") {
//         //             newTransaction.status = "settled";
//         //             await newTransaction.save();
//         //             console.log("Transaction status updated to settled.");
//         //         }
//         //     } catch (error) {
//         //         console.error("Error updating transaction status:", error);
//         //     }
//         // }, 60 * 60 * 1000); // Wait for 5 minutes before checking settlement

//         // return res.status(200).send({ message: "Transaction Successfull", newTrasaction: result.transaction.statusHistory })
//     }

//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }


// }



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