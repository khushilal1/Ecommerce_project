const nodemailer = require("nodemailer");
const { dev } = require("../config");


//for sending the mail to the user about their order
const sendOrderEmail = async (userEmail, orderDetails) => {
    try {

        let totalAmount = 0
        orderDetails.products.forEach((item) => {
            totalAmount = totalAmount + item.amount * item.quantity

        })
        console.log(totalAmount)



        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // Replace with your email service if different
            auth: {
                user: dev.app_port.authEmail, // Use environment variables for security
                pass: dev.app_port.authPassword, // App password or email account password
            },
        });

        // Email content
        const mailOptions = {
            from: dev.app_port.authEmail,
            to: userEmail,
            subject: "Order Confirmation",
            html: `
                <h3>Order Confirmation</h3>
                <p>Thank you for your order!</p>
                <h4>Order Details:</h4>
                <ul>
                    ${orderDetails
                    .products.map(
                        (item) => `
                        <li>
                            <strong>Product:</strong> ${item.product}<br />
                            <strong>Quantity:</strong> ${item.quantity}<br />
                            <strong>Amount:</strong> $${item.amount.toFixed(2)}
                        </li>z
                    `
                    )
                    .join("")}
                </ul>
                <p><strong>Total Amount:</strong> $${totalAmount.toFixed(2)}</p>
                <p>We hope you enjoy your purchase!</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${userEmail} for the order conformation.`);

    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports = { sendOrderEmail }