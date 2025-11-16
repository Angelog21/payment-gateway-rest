var express = require('express');
var router = express.Router();
let clientController = require('../controllers/clientController');
let rechargeController = require('../controllers/rechargeController');
let paymentController = require('../controllers/paymentController');

router.post('/client', clientController.createClient);
router.post('/recharge', rechargeController.rechargeBalance);
router.post('/payment', paymentController.paymentRegister);
router.post('/payment-confirm/:sessionId', paymentController.paymentConfirm);
router.post('/get-balance', clientController.getBalance);

module.exports = router;
