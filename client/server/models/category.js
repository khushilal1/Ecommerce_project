const mongoose = require("mongoose")

// 2.create of Schema 
const categorySchema = new mongoose.Schema({

    //for name
    name: {
        type: String
        ,
        required: [true, "Name is required"],
        trim: true,
        unique: true,
        minLength: [3, "name must have at least 3 character"],
        maxLength: [100, "name must have at least 100 character"]
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true

    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    },
    updateAt: {
        type: Date,
        default: new Date().toISOString()
    },

    //refrencing to the admin 
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Reference to Admin

},




    {
        timestamp: true

    }
)
//creating the model
const Category = mongoose.model("Category", categorySchema)
//exporting the user model
module.exports = { Category }