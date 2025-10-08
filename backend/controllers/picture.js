
const uploadImage = async (req, res) => {
    if(!req.file){
        return res.status(400).send('No file uploaded.');
    }
    const blob = bucket.file(Data.now(), path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: {
      contentType: req.file.mimetype,
    },
  });
  blobStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Upload failed.');
  });
   blobStream.on('finish', async () => {
    // Make the file publicly accessible
    await blob.makePublic(); 

    // The CDN URL format is: https://storage.googleapis.com/[BUCKET_NAME]/[OBJECT_NAME]
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    // 1. Save this URL to your PostgreSQL database
    // e.g., db.query('UPDATE users SET profile_image = $1 WHERE id = $2', [publicUrl, userId]);

    // 2. Send the URL back to the React frontend
    res.status(200).json({ imageUrl: publicUrl });
    
  });
  blobStream.end(req.file.buffer);
}
module.exports = {
    uploadImage
}