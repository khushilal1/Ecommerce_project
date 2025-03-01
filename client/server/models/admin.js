const mongoose = require("mongoose")

// 2.create of Schema 
const adminSchema = new mongoose.Schema({

    //for name
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        minLength: [3, "name must have at least 3 character"],
        maxLength: [30, "name must not exceed 30 character"],

    },
    //for email
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true

    },
    //for password
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [3, "passwords must have at least 3 character"],


    },

    // //for the address
    address: {
        type: String,
        trim: true
    },




    //for storing the image
    photo: {
        data: Buffer,
        contentType: String //jpeg,png

    },
    isAdmin: {
        type: String,
        default: 1
    },

    // //for checking the user is verifie or not
    isVerify: {
        type: Number,
        default: 0//0 user is not verified :send email->click on email->1

    },

    //for date
    createdAt: {
        type: Date,
        default: new Date().toISOString()

    },
    updateAt: {
        type: Date,
        default: new Date().toISOString()
    },
},
    {
        timestamp: true

    }
)

//creating the model
const Admin = mongoose.model("Admin", adminSchema)
//exporting the user model
module.exports = { Admin }