import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import indexRouter from "./routers/index.router.js";
import checkDbConnection from "./middleware/checkDbConnection.js";
import checkContactFields from "./middleware/checkContactFields.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    optionsSuccessStatus: 200,
  })
);
app.use("/api", express.static("./public"));
app.use("/api", checkDbConnection);
app.use("/api/contact", checkContactFields);
app.use("/api", indexRouter);

export default app;
