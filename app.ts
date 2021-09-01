import express from 'express';
import { config } from 'dotenv';
import { message } from './helpers/message';
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
    message(res,200,'Welcome to Medify API');
});

app.listen(PORT, () => {
    console.log(`Medify Server listening on ${PORT}. URL:http://localhost:${PORT}`);
});