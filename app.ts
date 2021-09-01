import express from 'express';
import { config } from 'dotenv';
import { message } from './helpers/message';
import { OK, NOT_FOUND } from "./helpers/messageTypes";
import mongoose from 'mongoose';

config();
const app = express();
const PORT= process.env.PORT;
const MONGODB_URI:any= String(process.env.MONGO_URI);
const connectOptions:any = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    };

try{
    mongoose.connect(MONGODB_URI, connectOptions)
}
catch(err){
    console.log(err);
}

mongoose.connection.once("open", () => {
console.log("MongoDB connected");
});

app.get('/', (req:any, res:any) => {
    message(res, OK,'Welcome to Medify API');
});

app.all('*', (req:any, res:any) => {
    message(res, NOT_FOUND,'Route does not exist');
});

app.listen(PORT, () => {
    console.log(`Medify Server listening on ${PORT}. URL:http://localhost:${PORT}`);
});