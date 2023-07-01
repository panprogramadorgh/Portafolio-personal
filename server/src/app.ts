import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import indexRouter from "./routers/index.router";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    optionsSuccessStatus: 200,
  })
);
app.use("/", indexRouter);

export default app;
