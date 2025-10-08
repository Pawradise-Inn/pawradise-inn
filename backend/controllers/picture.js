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
        return res.status(400).send('No file uploaded.');
    }
    
    // Debugging logs to confirm file is received
    console.log("File received by Multer:", req.file.originalname); 
    console.log("File buffer size:", req.file.buffer.length); 
    
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
        res.status(500).send('Upload failed due to GCS stream error.');
    });

    blobStream.on('finish', async () => {
        try {
            // REMOVED: await blob.makePublic(); 
            // This is unnecessary and conflicts with Uniform Bucket-Level Access (UBIA).
            // Since the bucket is public via IAM, the object is already public upon creation.

            // Construct the CDN URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Send the URL back to the React frontend
            res.status(200).json({ imageUrl: publicUrl });
        } catch (dbError) {
            // Catch error if subsequent steps fail (e.g., database update logic if it were here)
            console.error('Post-upload processing error:', dbError.message);
            res.status(500).send('Upload succeeded but failed to finalize access.');
        }
    });

    // Write the in-memory file buffer to the GCS stream
    blobStream.end(req.file.buffer);
}

module.exports = {
    uploadImage
}
