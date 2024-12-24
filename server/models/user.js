const mongoose = require("mongoose")

// 2.create of Schema 
const userSchema = new mongoose.Schema({

    //for name
    name: {
        type: String
        ,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "name must have at least 3 character"],
        maxLength: [31, "name must have at least 100 character"]
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
    //for the address
    address: {
        type: String,
        trim: true
    },

//for role as user or admin
    role: {
        type: Number,
        deafault: 0


    },



    // //for image
    // image: {
    //     type: String,
    //     required: [true, "image is required"]
    // },
    //for admin
    isAdmin: {
        type: Number,
        required: [true, "isAdmin is required"],//1 for admin and 0 for not admin
        default: 0
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
    //for toke 
    // token: {
    //     type: String,
    //     default: ""
    // },
},
    {
        timestamp: true

    }
)
//creating the model
const User = mongoose.model("Users", userSchema)
//exporting the user model
module.exports = { User }