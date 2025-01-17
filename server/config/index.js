require("dotenv").config()

//for modular 

const dev = {
    app_port:

    {
        serverPort: Number(process.env.SERVER_PORT) || 3001,
        clientUrl: process.env.CLIENT_URL,
        authEmail: process.env.AUTH_GMAIL,
        authPassword: process.env.AUTH_PASSWORD

    },
    db: {
        mongodbUrl: process.env.LOCAL_MONGODB_URI
    },
    secretKey: {
        jwtSecretKey: String(process.env.JWT_SECRET_KEY)
    },
    paymentKey: {
        braintreeMerchantId: String(process.env.BRAINTREE_MERCHANT_ID),
        braintreePrivateKey: String(process.env.BRAINTREE_PRIVATE_KEY),
        braintreePublicKey: String(process.env.BRAINTREE_PUBLIC_KEY)
    },
    adminSecretKey: String(process.env.ADMIN_SECRET_KEY)

}

module.exports = { dev } 