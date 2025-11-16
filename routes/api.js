var express = require('express');
var router = express.Router();
let clientController = require('../controllers/clientController');


router.post('/client', clientController.createClient);

module.exports = router;
