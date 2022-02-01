import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { message } from "./helpers/message";
import { OK, NOT_FOUND } from "./helpers/messageTypes";
import mongoose from "mongoose";
import userRouter from "./users/users.route";
import routineRouter from "./routines/routine.route";

//All necessary imports for logger
import morgan from 'morgan';
import fs from "fs";
import path from "path";
//

config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI: any = String(process.env.MONGO_URI);
const connectOptions: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(MONGODB_URI, connectOptions);
} catch (err) {
  console.log(err);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//logger
//
//setting up the output stream
let logStream = fs.createWriteStream(path.join(__dirname, 'logFile.log'), { flags: 'a' })
//
// setup the logger
app.use(morgan('combined', { stream: logStream }))
//


mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});


app.get("/", (req: any, res: any) => {
  message(res, OK, "Welcome to Medify API");
});

app.use("/api/users", userRouter);
app.use("/api/routines", routineRouter);

app.all("*", (req: any, res: any) => {
  message(res, NOT_FOUND, "Route does not exist");
});

app.listen(PORT, () => {
  console.log(
    `Medify Server listening on ${PORT}. URL:http://localhost:${PORT}`
  );
});
