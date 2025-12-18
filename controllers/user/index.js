const express = require('express');
const { createUser } = require('./userController');
const userValidator = require('./validator');
const router = express.Router();


router.route('/create').post(userValidator('createUserVal'), createUser);


module.exports = router