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
import redisClient from "./utils/redisClient";
import rateLimiter from "./middlewares/rateLimiter";

config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI: any = String(process.env.MONGO_URI);
const RATE_LIMIT_DURATION = parseInt(
  process.env.RATE_LIMIT_DURATION || "60000",
  10
);
const MAX_REQ_PER_DURATION = parseInt(
  process.env.MAX_REQ_PER_DURATION || "1000",
  10
);

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

app.use(
  rateLimiter({
    db: redisClient,
    duration: RATE_LIMIT_DURATION,
    errorMessage: "Sometimes You Just Have to Slow Down.",
    id: (ctx) => ctx.ip,
    headers: {
      remaining: "Rate-Limit-Remaining",
      reset: "Rate-Limit-Reset",
      total: "Rate-Limit-Total",
    },
    max: MAX_REQ_PER_DURATION,
    disableHeader: false,
  })
);

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
