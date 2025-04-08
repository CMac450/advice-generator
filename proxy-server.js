import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());


app.get('/advice', async (req, res) => {
    console.log('Received request to /advice');

    try {
        const upstreamURL = `https://zenquotes.io/api/quotes/random`;
        console.log('Fetching from:', upstreamURL);

        const response = await fetch(upstreamURL);

        console.log('Upstream status:', response.status);

        const data = await response.json();
        console.log('Upstream data:', data);

        res.json(data);
    } catch (err) {
        console.error('Error fetching advice:', err);
        res.status(500).json({ error: 'Proxy error: ' + err.message });
    }
});

app.listen(3001, () => {
    console.log('Proxy server listening on http://localhost:3001');
});