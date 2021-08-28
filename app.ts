import express from 'express';
import { config } from 'dotenv';
import { messager } from './helpers/message';

config();
const app = express();
const PORT= process.env.PORT;

app.get('/', (req:any, res:any) => {
    messager(res,200,'Welcome to Medify API');
});

app.listen(PORT, () => {
    console.log(`Medify Server listening on ${PORT}. http://localhost:${PORT}`);
});