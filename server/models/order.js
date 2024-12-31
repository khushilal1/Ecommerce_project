const { Schema, model } = require("mongoose")

//This is that model which keep the detail about  product user  detail. Such that which user has created the order in which product
const orderSchema = new Schema({

    //STORING THE MULTIPLE ORDER OF MULTIPLE PROFUCT
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

    payment: {},
    //the user are reffered and the order also keep the tracked of the user and product

    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

    ,
    status: {
        type: String,
        default: "Not processed",
        enum: ['Not processed',
            "Processing", "Shipped", "Delivered", "Cancelled"
        ]

    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    updateAt: {
        type: Date,
        default: new Date().toISOString()
    },
}

    , { timestamps: true }


 
)


//creating the model
const Order = new model("Order", orderSchema)
//exporting the user model
module.exports = { Order }