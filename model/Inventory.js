/* jshint esversion: 6 */

const mongoose = require('mongoose');
const InventorySchema = mongoose.Schema(
    {
        name: {
            desc: "The item name.",
            trim: true,
            type: String,
            required: true,
        },
        price: {
            desc: "Price of the product.",
            trim: true,
            type: Number,
            required: true,
        },
        itemno: {
            desc: "The item number.",
            trim: true,
            type: Number,
            required: true,
        },
        quantity: {
            desc: "Number of same item available",
            trim: true,
            type: Number,
            required: true,
        }
    },
    {
        strict: true,
        versionKey: false,
        timestamps: true
    }
);


module.exports = mongoose.model("inventory", InventorySchema);