import express from "express";
import { userRouter } from "./src/route/user-api.js";
import { errorMiddleware } from "./src/middleware/error-middleware.js";
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(userRouter);

app.use(errorMiddleware);
app.listen(3000, () => console.log("Server is running at http://127.0.0.1:3000"));
