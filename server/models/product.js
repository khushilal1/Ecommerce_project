const mongoose = require("mongoose")
const { Schema } = require("mongoose")
// 2.create of Schema 
//This is the product data which keep the recoed about the deatil of product
const productSchema = new mongoose.Schema({

    //for name
    name: {
        type: String
        ,
        required: [true, "Name is required"],
        trim: true,
        minLength: [3, "name must have at least 3 character"],
        maxLength: [150, "name must have at least 100 character"]
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true

    },

    description: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 500,
        required: [true, "Description is required"]


    }
    ,
    price: {
        type: Number,
        trim: true, required: [true, "price is required"]
    }
    ,

    quantity: {
        type: Number,
        required: [true, "quantity is required"]
    }
    ,
    sold: {
        type: Number,
        default: 0
    }
    ,
    shipping: {
        type: Boolean,

    },

    photo: {
        data: Buffer,
        contentType: String //jpeg,png

    },
   
    //refrencing to other  category model-->for knowing which product is of which category
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true]
    }
    ,

    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },



},
    { timestamps: true }

)
//creating the model
const Product = mongoose.model("Product", productSchema)
//exporting the user model
module.exports = { Product }