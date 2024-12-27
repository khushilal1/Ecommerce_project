const express = require("express");
const morgan = require("morgan");
const chalk = require("chalk")
const { dev } = require("./config/index.js");
const { connectDB } = require("./config/db.js");
const { userRoute } = require("./routes/user.js");
const { categoryRoute } = require("./routes/category.js");
const { productRoute } = require("./routes/product.js");
const cors = require('cors');


const app = express();
const port = dev.app_port.serverPort


//for middleware

app.use(morgan("dev")) //for cheking the api calling method
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//for getting the user
app.use(cors({
    origin:"*", //both are the same as one is ip addresss and other are the local host
    credentials: true
}))

app.use("/api", userRoute)
app.use("/api", categoryRoute)
app.use("/api", productRoute)







//checking the api  is wokring fine or notn
app.get("/test", (req, res) => {
    res.send("api is working fine")
})


//for the 404 as the client error
app.use((err, req, res, next) => {
    console.log(err.stack);
    return res.status(500).send({
        success: false,
        message: err.message
    })


})
//for the server error
app.use((err, req, res, next) => {
    console.log(err.stack);
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })

})
//for the port

app.listen(port, async () => {
    console.log(chalk.blue(`server is running at http://localhost:${port}`));
    await connectDB()

})