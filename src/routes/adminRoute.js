const express = require('express');
const adminController = require('../contollers/adminContoller')
const router = express.Router();

router.post('/adminRegister',adminController.adminReg)

module.exports = router;