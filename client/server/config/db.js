
const mongoose = require('mongoose')
const { dev } = require('../config/index')
//database conenction

const connectDB = async () => {

    try {

        await mongoose.connect(dev.db.mongodbUrl)
        console.log("Database is connected");

    }
    catch (error) {
        console.log("Database is not connected");
        console.log(error);
        process.exit(1)

    }


}

module.exports = { connectDB }