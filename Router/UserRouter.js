const express = require('express')
const router = express.Router()

const {AccountDetails, deposit, history}=require('../Controllers/UserController');
const verifyToken = require('../Middleware/VerifyToken');

router.post('/accountdetails',verifyToken, AccountDetails);
router.post('/deposit', verifyToken, deposit)
router.get('/history',history)


module.exports = router