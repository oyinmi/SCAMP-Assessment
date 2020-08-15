/* jshint esversion: 6 */

const express = require('express');

const router = express.Router();

//Salesperson Route
const salesperson = require('./saleperson');
router.use(salesperson);

//Admin Route
const admin = require('./admin');
router.use(admin);

// Inventory Route
const inventory = require('./inventory');
router.use(inventory);

// Order Route
const order = require('./order');
router.use(order);


module.exports = router;