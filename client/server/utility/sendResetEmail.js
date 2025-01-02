
const { dev } = require("../config/index")
const nodemailer = require('nodemailer'); // Ensure Nodemailer is imported

const sendResetEmail = async (userData) => {
    try {
       
        // Create an SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use true for port 465, false for 587
            auth: {
                user: dev.app_port.authEmail, // Replace with actual email
                pass: dev.app_port.authPassword, // Replace with actual password or app password
            },
            debug: true, // Enable debugging
        });

        // Verify connection configuration
        await transporter.verify();
        console.log("SMTP server is ready to send messages.");

        // Email options
        const mailOptions = {
            from: dev.app_port.authEmail, // Sender address
            to: userData.email, // Recipient address
            subject: userData.subject,
            html: userData.html, // HTML body
        };



        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log(`Reset link is  sent  to ${userData.email} successfully:`, info.messageId);

    } catch (error) {
        console.error("Error sending email:", error);
    }
};


//


module.exports = { sendResetEmail };
