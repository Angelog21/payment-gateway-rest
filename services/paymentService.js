const soap = require('soap');

const paymentRegister = (payload) => {
    return new Promise((resolve, reject) => {
        try {
            const baseUrl = process.env.SOAP_SERVICE_URL ;
            const wsdlUrl = `${baseUrl}/api/payment/wsdl`;
            const endpointUrl = `${baseUrl}/api/payment/server`;

            if (!payload || !payload.dni || !payload.phone || !payload.amount) {
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
                    amount: payload.amount,
                };

                client.paymentRegister(args, (callErr, result) => {
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
                        let val = JSON.parse(result.return.$value);

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

const paymentConfirm = (params,payload) => {
    return new Promise((resolve, reject) => {
        try {
            const baseUrl = process.env.SOAP_SERVICE_URL ;
            const wsdlUrl = `${baseUrl}/api/payment/wsdl`;
            const endpointUrl = `${baseUrl}/api/payment/server`;

            if ( !params.sessionId || !payload.token ) {
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
                    sessionId: params.sessionId,
                    token: payload.token,
                };

                client.paymentConfirm(args, (callErr, result) => {
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
                        let val = JSON.parse(result.return.$value);

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
    paymentRegister,
    paymentConfirm
}