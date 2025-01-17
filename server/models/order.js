
const { Schema, model } = require("mongoose");

// Schema for Order
const orderSchema = new Schema(
  {
    // Storing multiple products with quantity
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],

    // Payment details
    payment: {
      transactionId: { type: String },
      amount: { type: Number },
      status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
      method: { type: String, enum: ["Credit Card", "PayPal", "COD"] },
    },

    // Tracking the buyer
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },

    // Order status
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Creating the model
const Order = model("Order", orderSchema);

// Exporting the model
module.exports = { Order };
