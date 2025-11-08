const QRCode = require('qrcode');
const generatePayload = require('promptpay-qr');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responseHandler');

const genQR = async (req, res) => {
    const {amount} = Number(req.body);
    const mobileNumber = '1209000167848';
    const payload = generatePayload(mobileNumber, {amount})
    const option = {
        color: {
            dark: '#000',
            light: '#fff',
        }
    }
    QRCode.toDataURL(payload, option, (err, url) => {
        if(err){
            console.log('generate fail');
            return sendErrorResponse(res, 400, 'Generate fail', 'Unable to generate qr code');
        }
        else{
            return sendSuccessResponse(res, 200, "Generate successfully", "generate qr code", url); 
        }
    })
}

module.exports = {
    genQR
}