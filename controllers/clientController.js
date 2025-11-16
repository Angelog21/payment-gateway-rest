const clientService = require('../services/clientService');

const createClient = async (req,res) => {
    try {
        
        let serviceResponse = await clientService.createClient(req.body);

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
    createClient
}