
const { dev } = require("../config/index")
const nodemailer = require('nodemailer'); // Ensure Nodemailer is imported



//fuction for sending the email
const sendActivationEmail = async (emailData) => {
    try {
        // Create an SMTP transporter object
        const transporter = nodemailer.createTransport({
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

        // mail data
        const mailOptions = {
            from: dev.app_port.authEmail, // Sender address
            to: emailData.email, // Recipient address
            subject: emailData.subject,
            html: emailData.html
        };



        // Send the email with defibed traspot objext
        const info = await transporter.sendMail(mailOptions);
        //printing the info message
        console.log("Message sent successfully:", info.messageId);

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendActivationEmail };
