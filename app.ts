import express from 'express';
import { config } from 'dotenv';

config();
const app = express();
const PORT= process.env.PORT;

app.get('/', (req, res) => {
    res.json({
        'message': 'Hello World!'
    });
});

app.listen(PORT, () => {
    console.log(`Medify Server listening on ${PORT}. http://localhost:${PORT}`);
});