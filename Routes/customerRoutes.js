const express = require("express");

const router = express.Router();
const customerController  = require('../controller/customerController');

router.post('/customers',customerController.signUp);
router.post('/customers',customerController.login);

// router.route('/customers').get(customerController.get);


module.exports = router;