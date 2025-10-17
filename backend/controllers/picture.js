const {Storage} = require('@google-cloud/storage');
const path = require('path');

// Initialize GCS client using credentials
const storage = new Storage({
  projectId: 'sacred-epigram-471206-f5',
  keyFilename: path.join(__dirname, '../config/keyfile.json')
})
const bucket = storage.bucket('paw_image');

const uploadImage = async (req, res) => {
    if(!req.file){
        return res.status(400).json({
            success: false,
            message: "Please select an image to upload"
        });
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
        console.error('GCS Upload Stream Error:', err.message); // Log the specific error message
        res.status(500).json({
            success: false,
            message: "Unable to upload image. Please try again later"
        });
    });

    blobStream.on('finish', async () => {
        try {
            // REMOVED: await blob.makePublic(); 
            // This is unnecessary and conflicts with Uniform Bucket-Level Access (UBIA).
            // Since the bucket is public via IAM, the object is already public upon creation.

            // Construct the CDN URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Send the URL back to the React frontend
            res.status(201).json({ success: true, imageUrl: publicUrl });
        } catch (dbError) {
            // Catch error if subsequent steps fail (e.g., database update logic if it were here)
            console.error('Post-upload processing error:', dbError.message);
            res.status(500).json({
                success: false,
                message: "Image uploaded but couldn't be saved. Please try again"
            });
        }
    });

    // Write the in-memory file buffer to the GCS stream
    blobStream.end(req.file.buffer);
}

module.exports = {
    uploadImage
}
