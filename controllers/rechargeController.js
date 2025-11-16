const rechargeService = require('../services/rechargeService');

const rechargeBalance = async (req,res) => {
    try {
        
        let serviceResponse = await rechargeService.rechargeBalance(req.body);

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
    rechargeBalance
}