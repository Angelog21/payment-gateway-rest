var express = require('express');
var router = express.Router();
let clientController = require('../controllers/clientController');
let rechargeController = require('../controllers/rechargeController');

router.post('/client', clientController.createClient);
router.post('/recharge', rechargeController.rechargeBalance);

module.exports = router;
