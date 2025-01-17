const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
const multer = require('multer');
const { log } = require('console');

// Set up multer storage and file destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set up upload directory 
    },
    filename: function (req, file, cb) {
        // Use the original file name or generate a unique one to avoid overwriting
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploads = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
    fileFilter: function (req, file, cb) {
        // Allow only image files (you can customize this further)
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const nmimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
})

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
}

// Clarifai API request route
app.post('/api/clarifai/face-detection', async (req, res) => {
    const { imageURL } = req.body;

    const PAT = '874fa60878c6469181ebfd21d779414d';
    const USER_ID = 'drewbearz';
    const APP_ID = 'face-detection-app';

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageURL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${PAT}`
        },
        body: raw
    };

    try {
        const response = await fetch('https://api.clarifai.com/v2/models/face-detection/outputs', requestOptions);
        const data = await response.json();
        res.json(data); 
    } catch (error) {
        console.error('Error calling Clarifai API:', error);
        res.status(500).json({ message: 'Failed to connect to Clarifai API', error });
    }
});

// Route for handling file uploads
app.post('/upload', uploads.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // You can now access the uploaded file via req.file
    console.log('Uploaded file:', req.file);

    res.json({
        message: 'File upload successful',
        file: req.file
    });
})

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
})