
const { User } = require("../models/user")
const { getHashPassword, getComparePassword } = require("../helper/securePassword")
const { getJsonToken } = require("../utility/generateToken")
const { tokenVerify } = require("../utility/tokenVerify")
const { dev } = require("../config/index")
const { sendActivationEmail } = require("../utility/sendActivationEmail")
const { sendResetEmail } = require("../utility/sendResetEmail")
const jwt = require("jsonwebtoken")
//for register and email send  verification

const userRegister = async (req, res) => {

    try {
        //getting the data from body
        const { name, email, password, address } = req.body
        console.log(req.body);
        //userData

        // //cheking the use is availabel in databases or not
        const existingUser = await User.findOne({ email: email })
        // console.log(existingUser);


        // )
        // // //checking the user is existing the send the user is already is available

        if (existingUser) {
            return res.status(403).json({ message: "User with the email is already registered" })
        }

        // //securing the password
        const hashPassword = await getHashPassword(password)
        // console.log(hashPassword);


        //if the user is activate the you want to store in databases
        //getting teh token for activating the user
        const token = await getJsonToken(name, email, hashPassword, address)
        // console.log(token);
        // send email, and prepare the email

        // // mail data for activating the account
        const emailData = {
            email,
            subject: "Account Activation Email",

            html: `<p>Welcome ${name} <a href="${dev.app_port.clientUrl}/auth/activate/${token}">Activate your account</a></p> <p>Your link  will be expired within 10 minutes</p>`, // HTML body
        };

        // //calling the emailVerifcation function
        await sendActivationEmail(emailData)
        // //for other
        return res.status(200).json({
            message: `Please go to your email:${email} for completing your activating your account`
        })

    }
    //for catchig the error
    catch (error) {
        res.status(500).json({ message: error.message })
    }


}




//for activating the account after sending the activation email
const activateAccount = async (req, res) => {

    try {
        //getting the token from req.body
        const { token } = req.body
        console.log(token);

        //checking the token if not available 
        if (!token) {
            return res.status(404).json({ error: "Token not found" })
        }
        //verifying the token
        const decodedData = await tokenVerify(token, res)
        // console.log(decodedData);
        //getting the all the value 
        const { name, email, password, address } = decodedData
        //now creating new user
        const newUser = new User({
            name: name, email: email, password: password, address: address, isVerify: 1
        })

        console.log(newUser);

        //saving in the data base
        await newUser.save()



        return res.status(200).json({
            message: "Account was activated and Saved successfully"
        })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}

//for login user

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        //checking the data in database
        console.log((req.body));
        //checking the data

        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json({ message: "User with the email is not found" })
        }
        const hashPassword = existingUser.password
        //comapraring the password
        const isPasswordMatched = await getComparePassword(password, hashPassword)
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Email/Password did not match" })
        }
        //creating the token with user id only
        const token = jwt.sign({ _id: existingUser._id }, dev.secretKey.jwtSecretKey, { expiresIn: "10h" })



        // Setting the token as a cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Protect against CSRF attacks
            maxAge: 60 * 60 * 1000 // Cookie expires in 10 minutes
        });

        
        //sending the data to the frontend
        return res.status(200).json({
            message: "User was signed",
            user: {
                name: existingUser.name,
                email: existingUser.email,
                address: existingUser.address,
                isAdmin: existingUser.isAdmin
            }
            , token: token
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}

//

const forgetPassword = async (req, res) => {

    try {
        const { email } = req.body
        console.log(email);
        const userData = await User.findOne({ email })
        console.log(userData);
        if (!userData) {
            return res.status(404).send({ error: "Email is  not registered" })
        }





        //creating a small token
        const token = jwt.sign({ _id: userData._id }, dev.secretKey.jwtSecretKey, { expiresIn: "10m" })
        // mail data for activating the account
        const emailData = {
            email: userData.email, // Recipient's email
            subject: "Reset Password Email", // Email subject
            html: `
                <p>Hello ${userData.name},</p>
                <p>We received a request to reset your password. Click the link below to reset it:</p>
                <a href="${dev.app_port.clientUrl}/auth/reset-password/${token}">Reset Your Password</a>
                <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
                <p>If you did not request this, please ignore this email or contact support if you have questions.</p>
                <p>Best regards,</p>
                <p>${dev.app_port.authEmail}</p>
            `, // HTML body
        };


        //calling the emailVerifcation function
        await sendResetEmail(emailData, token)
        return res.status(200).json({ message: `Reset link is send  to ${userData.email} ` })


    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}

//

const resetPassword = async (req, res) => {

    try {
        //
        const { token } = req.headers
        if (!token) {
            return res.status(400).send({ error: "Token is invalid" })
        }
        //for decoding the token
        const decodedData = jwt.verify(token, dev.secretKey.jwtSecretKey)
        console.log(decodedData);

        const { password } = req.body
        console.log(password);
        //convet the passwod in hash
        const hashPassword = await getHashPassword(password)


        //update real password
        await User.findByIdAndUpdate({ _id: decodedData._id }, {
            $set: { password: hashPassword }

        })


        return res.status(200).json({ Message: "Your Password has reset successfully" })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}

//c

const loadProtected = async (req, res) => {

    try {
        console.log("load protected");
        console.log(req.userId);
        res.send({ message: "Protected route working fine" })



    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}


module.exports = { userRegister, activateAccount, loginUser, forgetPassword, resetPassword, loadProtected }