/* jshint esversion: 6 */

const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const order = express.Router();

const Order = require("../model/Order");


/**
 * @method - GET
 * @param - /order
 * @description - make order
 */

// Order Inventory
order.post(
    "/saleperson/order",
    [
        check("name", "Please Enter a Valid Name")
            .not()
            .isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name } = req.body;

        try {
            let order = await Order.findOne({
                name
            });
            if (!order)
                return res.status(400).json({
                    message: "Item not available"
                });

            const isMatch = await name;
            if (!isMatch) 
                return res.status(400).json({
                    message: "Item is not available."
                });
                
            const payload = {
                order: {
                    id: order.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );            
        } catch (err) {
            console.error(err);
            res.status(500).json({
                meassage: "Server Error"
            });
        }
    }
);


module.exports = order;