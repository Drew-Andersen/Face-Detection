const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');

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

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
})