const mongoose = require("mongoose")
const {Schema}=require("mongoose")
// 2.create of Schema 
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

    //refrencing to other model
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "CategoryId is required"]
    }
    ,

    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    updateAt: {
        type: Date,
        default: new Date().toISOString()
    },

},

)
//creating the model
const Product = mongoose.model("Product", productSchema)
//exporting the user model
module.exports = { Product }