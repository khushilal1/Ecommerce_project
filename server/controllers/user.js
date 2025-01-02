
const { User } = require("../models/user")
const { getHashPassword, getComparePassword } = require("../helper/securePassword")
const { getJsonToken } = require("../utility/generateToken")
const { tokenVerify } = require("../utility/tokenVerify")
const { dev } = require("../config/index")
const { sendActivationEmail } = require("../utility/sendActivationEmail")
const { sendResetEmail } = require("../utility/sendResetEmail")
const jwt = require("jsonwebtoken")
const fs = require("fs")





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
            return res.status(409).json({ message: "User already registered." })
        }

        // //securing the password as in hash form
        const hashPassword = await getHashPassword(password)
        // console.log(hashPassword);


        //if the user is activate the you want to store in databases
        //getting teh token for activating the user
        const token = await getJsonToken(name, email, hashPassword, address)
        console.log(token);

        // send email, and prepare the email
        // // mail data for activating the account
        const emailData = {
            email, // Recipient's email
            subject: "Activate Your Account", // Email subject
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #2a9df4;">Welcome, ${name}!</h2>
                
                <p>Thank you for signing up. To activate your account, please click the button below:</p>
                
                <p>
                  <a 
                    href="${dev.app_port.clientUrl}/auth/activate/${token}" 
                    style="background-color: #2a9df4; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; display: inline-block; margin-top: 10px;">
                    Activate Your Account
                  </a>
                </p>
                
                <p><strong>Note:</strong> This activation link will expire in 10 minutes. If the link has expired, you will need to request a new activation email.</p>
                
                <p>If you did not create this account, please ignore this email or contact our support team immediately.</p>
                
                <p>Best regards,</p>
                <p style="font-weight: bold;">The ${dev.app_port.authEmail} Team</p>
              </div>
            `, // HTML body
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
        //checking the token is available
       // console.log(req.headers.authorization);

        // if (!req.headers.authorization) {
        //     return res.status(401).json({ error: "No token found" })
        // }


        // const token = req.headers.authorization
        // //getting the token from req.body
        // console.log(token);

        const { token } = req.body

        // // //verifying the token
        const decodedData = await tokenVerify(token, res)
        // console.log(decodedData);
        //getting the all the value 
        const { name, email, password } = decodedData
        //now creating new user
        const newUser = new User({
            name: name, email: email, password: password, isVerify: 1,isAdmin:0
        })

        // // console.log(newUser);

        //saving in the data base
        await newUser.save()

        // //return after the account is created
        return res.status(201).json({
            message: "Account created and saved successfully."
        })

    }
    //internal server error
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
        //getting the passwd form the database and coare the password with entered password
        const hashPassword = existingUser.password
        //comapraring the password
        const isPasswordMatched = await getComparePassword(password, hashPassword)
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Email/Password did not match" })
        }



        //creating the token with user id only
        const token = jwt.sign({ _id: existingUser._id }, dev.secretKey.jwtSecretKey, { expiresIn: "10h" })



        // Setting the token as a cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
            sameSite: 'strict', // Protect against CSRF attacks
            maxAge: 60 * 60 * 1000 // Cookie expires in 10 minutes ,it should be in the millisecond
        });


        //sending the data to the frontend
        return res.status(200).json({
            message: "User was signed",
            user: {
                userId: existingUser._id,
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






//for forget password
const forgetPassword = async (req, res) => {

    try {
        const { email } = req.body
        console.log(email);
        //checking the user with email is avialba or not in the system
        const userData = await User.findOne({ email })
        console.log(userData);
        //if user not avilane then
        if (!userData) {
            return res.status(404).send({ message: "Email is  not registered" })
        }





        //creating a small token
        const token = jwt.sign({ _id: userData._id }, dev.secretKey.jwtSecretKey, { expiresIn: "2m" })
        console.log(token);

        // mail data for activating the account
        // const emailData = {
        //     email: userData.email, // Recipient's email
        //     subject: "Reset Password Email", // Email subject
        //     html: `
        //         <p>Hello ${userData.name},</p>
        //         <p>We received a request to reset your password. Click the link below to reset it:</p>
        //         <a href="${dev.app_port.clientUrl}/auth/reset-password/${token}">Reset Your Password</a>
        //         <p><strong>Note:</strong> This link will expire in 10 minutes.</p>
        //         <p>If you did not request this, please ignore this email or contact support if you have questions.</p>
        //         <p>Best regards,</p>
        //         <p>${dev.app_port.authEmail}</p>
        //     `, // HTML body
        // };


        const emailData = {
            email: userData.email, // Recipient's email
            subject: "Password Reset Request", // Email subject
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #2a9df4;">Hello ${userData.name},</h2>
                
                <p>We have received a request to reset your account password. You can reset your password by clicking on the link below:</p>
                
                <p>
                  <a 
                    href="${dev.app_port.clientUrl}/auth/reset-password/${token}" 
                    style="background-color: #2a9df4; color: white; text-decoration: none; padding: 10px 15px; border-radius: 5px; display: inline-block; margin-top: 10px;">
                    Reset Your Password
                  </a>
                </p>
                
                <p><strong>Important:</strong> This link will expire in 10 minutes. If the link expires, you will need to request a new password reset.</p>
                
                <p>If you did not request a password reset, you can safely ignore this email. If you have any concerns or believe this request was unauthorized, please contact our support team immediately.</p>
                
                <p>Best regards,</p>
                <p style="font-weight: bold;">The ${dev.app_port.authEmail} Team</p>
              </div>
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


//reseting the password
const resetPassword = async (req, res) => {

    try {
        //getting the token from headers
        const { token } = req.headers
        if (!token) {
            return res.status(401).send({ error: "Token is invalid or missing" })
        }
        //for decoding the token
        const decodedData = jwt.verify(token, dev.secretKey.jwtSecretKey)
        console.log(decodedData);
        //getting the new password


        const { password } = req.body

        console.log(password);
        //checking if the password is avilable or not
        if (!password) {
            return res.status(400).send({ message: "Password is required" })
        }
        //convet the passwod in hash
        const hashPassword = await getHashPassword(password)


        //update  password of databases
        const updatedUser = await User.findByIdAndUpdate({ _id: decodedData._id }, {
            $set: { password: hashPassword }

        }, { new: true })



        //checking if the updatedUser is avilable or not
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }



        //returing the message if the password has successfully reset
        return res.status(200).json({ Message: "Your Password was reset successfully" })

    }
    catch (error) {
        res.status(500).send({ message: "Token has expired" })
    }


}



//for updating the user profile
const updateUser = async (req, res) => {

    try {
        //getting the user id
        const userId = req.userId
        console.log(userId)

        //update the detail of user without the photo
        const existingUser = await User.findOne({ _id: userId },)
        console.log(existingUser)



        // // updating the user detail
        const { name, password, address } = req.fields
        //checking the name ,password,address is available or not
        if (!name || !password || !address) {
            return res.status(400).json({ message: "name,password ,address of user is required" })
        }
        //checking for the passwaord to change into the hash
        const hashPassword = await getHashPassword(password)


        // //update the detail of user without the photo
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, {
            name: name, address: address, password: hashPassword
        }, { new: true })



        //checking the photo is available  or not
        const { photo } = req.files
        if (!photo) {
            return res.status(400).json({ message: "Upload the profile pic is required" })
        }

        //if the size of photo is greater than 2MB or not
        if (photo.size > 2 * 1024 * 1024) {
            return res.status(400).json({ message: "The size of photo cannot exceed  2 MB" })

        }





        console.log(updatedUser)
        // // updating the user with photo
        if (photo) {
            //storing the data of phot as buffer
            updatedUser.photo.data = fs.readFileSync(photo.path)
            //stromg the extension as photp content type
            updatedUser.photo.contentType = photo.type
        }


        //saving the detail in databse after the updation
        updatedUser.save()


        // returing the user after updatoing theri profile
        return res.status(200).json({ message: "Updated User was  returned", updatedUser: updatedUser })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}





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


module.exports = { userRegister, activateAccount, loginUser, forgetPassword, resetPassword, updateUser, loadProtected }