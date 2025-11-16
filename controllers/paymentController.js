const paymentService = require('../services/paymentService');

const paymentRegister = async (req,res) => {
    try {
        
        let serviceResponse = await paymentService.paymentRegister(req.body);

        return res.json(serviceResponse);

    } catch (error) {
        return res.json({
            success: false,
            error_code: 500,
            message: 'Internal Server Error: ' + error.message,
            data: []
        });
    }
}

const paymentConfirm = async (req,res) => {
    try {
        
        let serviceResponse = await paymentService.paymentConfirm(req.params,req.body);

        return res.json(serviceResponse);

    } catch (error) {
        return res.json({
            success: false,
            error_code: 500,
            message: 'Internal Server Error: ' + error.message,
            data: []
        });
    }
}

module.exports = {
    paymentRegister,
    paymentConfirm
}