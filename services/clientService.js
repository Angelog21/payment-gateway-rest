const soap = require('soap');

let createClient = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const baseUrl = (process.env.SOAP_SERVICE_URL || '').replace(/\/$/, '');
            const wsdlUrl = `${baseUrl}/api/user/wsdl`;
            const endpointUrl = `${baseUrl}/api/user/server`;

            if (!payload || !payload.name || !payload.dni || !payload.email || !payload.phone) {
                return reject({
                    success: false,
                    error_code: 400,
                    message: "Faltan datos para realizar el registro.",
                    data: []
                });
            }

            soap.createClient(wsdlUrl, (createErr, client) => {
                if (createErr) {
                    return reject({
                        success: false,
                        error_code: 400,
                        message: createErr.message,
                        data: []
                    });
                }

                client.setEndpoint(endpointUrl);

                const args = {
                    dni: payload.dni,
                    phone: payload.phone,
                    name: payload.name,
                    email: payload.email
                };

                client.registerUser(args, (callErr, result) => {
                    if (callErr) {
                        return reject({
                            success: false,
                            error_code: 500,
                            message: callErr.message,
                            data: []
                        });
                    }

                    if (!result || !result.return) {
                        return reject({
                            success: false,
                            error_code: 500,
                            message: 'Result null',
                            data: []
                        });
                    }

                    try {
                        let val;

                        val = JSON.parse(result.return.$value);

                        if (val.success == false) {
                            return resolve({
                                success: false,
                                error_code: val.error_code || 500,
                                message: val.message,
                                data: val.data || []
                            });
                        }

                        return resolve({
                            success: true,
                            error_code: 0,
                            message: val.message,
                            data: val.data
                        });
                    } catch (parseErr) {
                        console.log('parse error', parseErr);
                        return reject({
                            success: false,
                            error_code: 500,
                            message: 'Respuesta invalida del servicio SOAP',
                            data: []
                        });
                    }
                });
            });
        } catch (err) {
            console.log(err);
            return reject({
                success: false,
                error_code: 500,
                message: 'error interno del servidor',
                data: []
            });
        }
    });
}

module.exports = {
    createClient
}