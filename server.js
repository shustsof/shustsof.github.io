const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const JSON_FILE_PATH = path.join(__dirname, 'images.json');

// Configure to serve static files from the current project directory
app.use(express.static(__dirname));

// Configure body-parser to handle JSON requests
app.use(bodyParser.json({ limit: '50mb' }));

// Handle request to update the portfolio
app.post('/upload', (req, res) => {
    const newEntry = req.body;

    // Read the current JSON file
    fs.readFile(JSON_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Failed to read JSON file' });
        }

        let jsonData = JSON.parse(data);

        // Generate a new ID for the new entry
        const newId = ('0000' + (Object.keys(jsonData).length + 1)).slice(-4);
        jsonData[newId] = newEntry;

        // Write the updated JSON back to the file
        fs.writeFile(JSON_FILE_PATH, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return res.status(500).json({ error: 'Failed to write JSON file' });
            }

            res.json({ success: true });
        });
    });
});
app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "interest-cohort=()");
    next();
});
