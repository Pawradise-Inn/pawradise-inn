const prisma = require("../prisma/prisma")
const QRCode = require('qrcode')
const generatePayload = required('promptpay-qr')
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

// const generateQR = async(req, res) =>{
//     const amount = parseFloat(req.body.amount);
//     const mobileNumber = process.env.PROMPTPAY_NUM;

//     const payload = generatePayload(mobileNumber, {amount});
//     const option = {
//         dark: '#000',
//         light: '#FFF'
//     }

//     try{
//         const qrDataURL = QRCode.toDataURL(payload, option);
            
//         return sendSuccessResponse(
//             res,
//             201,
//             "QR_GENERATED",
//             "Generate QRcode successfully",
//             {qrDataURL}
//         )
//     }catch(err){
//         return sendErrorResponse(
//             res,
//             500,
//             "FAIL_GENERATE_QRCODE",
//             "Unable to generate QRCode"
//         )
//     }
// }

const getPayments = async (req, res) => {
   
}

const getPayment = async (req, res) => {
    try{

    }catch(err){
        
    }
}

const createPayment = async (req, res) => {
    try{

    }catch(err){
        
    }
}

const deletePayment = async (req, res) => {
    try{

    }catch(err){

    }
}

module.exports ={
    generateQR,
}