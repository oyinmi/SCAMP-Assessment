/* jshint esversion: 6 */

const mongoose = require('mongoose');
const inventory = require('../routes/inventory');
const OrderSchema = mongoose.Schema(
    {
        inventory: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: inventory,
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
        timestamps: true,
    }
);


module.exports = mongoose.model("order", OrderSchema);