/* jshint esversion: 6 */

const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const inventory = express.Router();

const Inventory = require("../model/Inventory");


/**
 * @method - POST
 * @param - /create
 * @description - Add Inventory 
 */

//  Create Inventory
inventory.post(
    "/admin/create",
    [
        check("name", "Please Enter a Valid Name")
            .not()
            .isEmpty(),
        check("price", "Price of the product.")
            .not()
            .isEmpty(),
        check("itemno", "The item number.")
            .not()
            .isEmpty(),
        check("quantity", "Number of same item available")
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

        const {
            name,
            price,
            itemno,
            quantity
        } = req.body;
        try {
            let inventory = await Inventory.findOne({
                name
            });
            if (inventory) {
                return res.status(400).json({
                    msg: "Item Already Exists"
                });
            }    

            inventory = new Inventory({
                name,
                price,
                itemno,
                quantity
            });

            await inventory.save();

            inventory = await Inventory.findOne({
                name
            });
            return res.status(200).json({
                "status": "successful", 
                 data: inventory 
            });
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving Inventory");
        }
    }    
);


/**
 * @method - POST
 * @param - /view
 * @description - view Inventory
 */

// View Inventory
inventory.post(
    "/saleperson/view",
    [
        check("name", "Please Enter a Valid Name")
        .not()
        .isEmpty()
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
            let inventory = await Inventory.findOne({
                name
            });
            if (!inventory) 
                return res.status(400).json({
                    msg: "Item does not exist."
                });

            const isMatch = await name;
            if (!isMatch)  
                return res.status(400).json({
                    message: "Item is not available."
                });
                
            inventory = await Inventory.findOne({
                name
            });
            return res.status(200).json({
                "status": "successful",
                 data: inventory
            });
            
        } catch (err) {
            console.error(err);
            res.status(500).json({
                meassage: "Server Error"
            });
        }
    }
);


module.exports = inventory;
