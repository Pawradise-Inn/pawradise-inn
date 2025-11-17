const {Storage} = require('@google-cloud/storage');
const path = require('path');
const { sendErrorResponse, sendSuccessResponse } = require("../utils/responseHandler");

const keyBase64 = process.env.GOOGLE_KEY_JSON;

// 2. Decode it from Base64 back into the JSON string
const keyJson = Buffer.from(keyBase64, 'base64').toString('utf8');

// 3. Parse the JSON string into an object
const credentials = JSON.parse(keyJson);

// Initialize GCS client using credentials
const storage = new Storage({
  projectId: 'sacred-epigram-471206-f5',
  credentials
})
const bucket = storage.bucket('paw_image');

const uploadImage = async (req, res) => {
    if(!req.file){
        return sendErrorResponse(res, 400, "MISSING_FIELDS", "Please select an image to upload");
    }
    
    // 1. Combine filename parts into a single string using template literal
    // We use a unique timestamp + the original file extension
    const filename = `${Date.now()}${path.extname(req.file.originalname)}`;
    
    // 2. Pass the single filename string to bucket.file()
    const blob = bucket.file(filename);

    const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
            contentType: req.file.mimetype,
        },
    });

    blobStream.on('error', (err) => {
        console.error('GCS Upload Stream Error:', err.message);
        return sendErrorResponse(res, 500, "UNABLE_TO_SAVE", "Unable to upload image. Please try again");
    });

    blobStream.on('finish', async () => {
        try {
            // REMOVED: await blob.makePublic(); 
            // This is unnecessary and conflicts with Uniform Bucket-Level Access (UBIA).
            // Since the bucket is public via IAM, the object is already public upon creation.

            // Construct the CDN URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Send the URL back to the React frontend
            return sendSuccessResponse(res, 201, "CREATED_SUCCESSFULLY", "Image uploaded successfully", null, { imageUrl: publicUrl });
        } catch (dbError) {
            // Catch error if subsequent steps fail (e.g., database update logic if it were here)
            console.error('Post-upload processing error:', dbError.message);
            return sendErrorResponse(res, 500, "UNABLE_TO_SAVE", "Image uploaded but couldn't be saved. Please try again");
        }
    });

    // Write the in-memory file buffer to the GCS stream
    blobStream.end(req.file.buffer);
}

module.exports = {
    uploadImage
}
