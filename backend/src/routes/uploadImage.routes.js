import express from 'express';
import { uploadOnCloudinary } from '../utils/cloudinary.js'; // Import the Cloudinary function
import {upload} from '../middlewares/multer.middleware.js';
const router = express.Router();


router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const tempFilePath = req.file.path;  // Get the temporary file path

    try {
        // Upload the file to Cloudinary
        const response = await uploadOnCloudinary(tempFilePath);

        if (response) {
            // Send back the Cloudinary URL
            return res.status(200).json({ url: response.url });
        } else {
            return res.status(500).json({ message: 'Failed to upload to Cloudinary' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error processing the image', error });
    }
});


export default router;
