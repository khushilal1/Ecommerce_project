
const { Admin } = require("../models/admin")
const { getHashPassword, getComparePassword } = require("../helper/securePassword")
const { getJsonToken } = require("../utility/generateToken")
const { tokenVerify } = require("../utility/tokenVerify")
const { dev } = require("../config/index")
const { sendActivationEmail } = require("../utility/sendActivationEmail")
const { sendResetEmail } = require("../utility/sendResetEmail")
const jwt = require("jsonwebtoken")
const fs = require("fs")


//for register and email send  verification
const adminRegister = async (req, res) => {

  try {
    //getting the data from body
    const { name, email, password, address, secretKey } = req.body
    console.log(req.body);

    // Validate the admin secret key
    if (!secretKey || secretKey !== dev.adminSecretKey) {
      return res.status(400).json({ error: 'Provide valid secret key for admin registration' });
    }
    // //cheking the use is availabel in databases or not
    const existingAdmin = await Admin.findOne({ email: email })
    // console.log(existingUser);


    //   // )
    //   // // //checking the user is existing the send the user is already is available

    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already registered." })
    }

    //   // //securing the password as in hash form
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





// /for activating the account after sending the activation email
const activateAccount = async (req, res) => {

  try {
    //checking the token is available
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No token found" })
    }


    const token = req.headers.authorization
    //getting the token from req.body
    console.log(token);


    // //verifying the token
    const decodedData = await tokenVerify(token, res)
    // console.log(decodedData);
    //getting the all the value 
    const { name, email, password } = decodedData
    //now creating new user
    const newAdmin = new Admin({
      name: name, email: email, password: password, isVerify: 1
    })

    // console.log(newUser);

    //saving the admin data  in the database
    await newAdmin.save()

    //return after the account is created
    return res.status(201).json({
      message: "Admin Account created  successfully."
    })

  }


  //internal server error
  catch (error) {
    res.status(500).send({ message: error.message })
  }


}

//for login of user

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Logging the incoming request body
    console.log(req.body);

    // Check if the admin exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin with the provided email is not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatched = await getComparePassword(password, existingAdmin.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Generate a token for the admin
    const token = jwt.sign(
      { _id: existingAdmin._id, isAdmin: true }, // Including admin role in the token payload
      dev.secretKey.jwtSecretKey,
      { expiresIn: "10h" }
    );

    // Set the token as a cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      sameSite: "strict", // Protect against CSRF attacks
      maxAge: 10 * 60 * 60 * 1000, // Cookie expires in 10 hours
    });

    // Return the admin details and token to the frontend
    return res.status(200).json({
      message: "Admin successfully logged in",
      admin: {
        adminId: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
      },
      token,
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





//for forget password
const forgetPassword = async (req, res) => {

  try {
    const { email } = req.body
    console.log(email);
    //checking the user with email is avialba or not in the system
    const adminData = await Admin.findOne({ email })
    console.log(adminData);
    //if user not avilane then
    if (!adminData) {
      return res.status(404).send({ message: "Email is  not registered" })
    }





    //creating a small token
    const token = jwt.sign({ _id: adminData._id }, dev.secretKey.jwtSecretKey, { expiresIn: "10h" })
    console.log(token);


    //for the email data
    const emailData = {
      email: adminData.email, // Recipient's email
      subject: "Password Reset Request", // Email subject
      html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #2a9df4;">Hello ${adminData.name},</h2>
              
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
    return res.status(200).json({ message: `Reset link is send  to ${adminData.email} ` })


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
    console.log(token)
    //checking the token is available ot not
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
    const updatedAdmin = await Admin.findByIdAndUpdate({ _id: decodedData._id }, {
      $set: { password: hashPassword }

    }, { new: true })



    //checking if the updatedUser is avilable or not
    if (!updatedAdmin) {
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
const updateAdmin = async (req, res) => {

  try {
    //getting the user id
    const userId = req.userId
    console.log(userId)

    //update the detail of user without the photo
    const existingAdmin = await Admin.findOne({ _id: userId },)
    console.log(existingAdmin)



    // // updating the user detail
    const { name, password, address } = req.fields
    //checking the name ,password,address is available or not
    if (!name || !password || !address) {
      return res.status(400).json({ message: "name,password ,address of user is required" })
    }
    //checking for the passwaord to change into the hash
    const hashPassword = await getHashPassword(password)


    // //update the detail of user without the photo
    const updatedAdmin = await Admin.findByIdAndUpdate({ _id: userId }, {
      name: name, address: address, password: hashPassword
    }, { new: true })



    //checking the photo is available  or not
    const { photo } = req.files
    if (!photo) {
      return res.status(400).json({ message: "Upload the profile pic." })
    }

    //if the size of photo is greater than 2MB or not
    if (photo.size > 2 * 1024 * 1024) {
      return res.status(400).json({ message: "The size of photo cannot exceed  2 MB" })

    }





    console.log(updatedAdmin)
    // // updating the user with photo
    if (photo) {
      //storing the data of phot as buffer
      updatedAdmin.photo.data = fs.readFileSync(photo.path)
      //stromg the extension as photp content type
      updatedAdmin.photo.contentType = photo.type
    }


    //saving the detail in databse after the updation
    updatedAdmin.save()


    // returing the user after updatoing theri profile
    return res.status(200).json({ message: "Updated User was  returned", updatedAdmin: updatedAdmin })

  }
  catch (error) {
    res.status(500).send({ message: error.message })
  }


}







module.exports = { adminRegister, activateAccount, loginAdmin, forgetPassword, resetPassword, updateAdmin }