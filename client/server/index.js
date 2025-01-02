const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk")
const { dev } = require("./config/index.js");
const { connectDB } = require("./config/db.js");
const { userRoute } = require("./routes/user.js");
const { categoryRoute } = require("./routes/category.js");
const { productRoute } = require("./routes/product.js");
const cors = require('cors');
const { orderRoute } = require("./routes/order.js");
const { clientError, serverError } = require("./controllers/error.js");
const { adminRoute } = require("./routes/admin.js");
const app = express();
const port = dev.app_port.serverPort
const cookieParser = require('cookie-parser');




//for middleware
app.use(morgan("dev")) //for cheking the api calling method
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
//for getting the user

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Add the specific domains
    credentials: true // Allow credentials (cookies, headers)
}));
//for user managemnet
app.use("/api", userRoute)


//for admin management
app.use("/api/admin", adminRoute)
//for category management
app.use("/api", categoryRoute)
//for product managemnet
app.use("/api", productRoute)

//for order management
app.use("/api", orderRoute)


//for the 404 as the client error
app.use(clientError)
//for the server error
app.use(serverError)
//for the port

//server the 
app.listen(port, async () => {
    console.log(chalk.blue(`server is running at http://localhost:${port}`));
    await connectDB()

})