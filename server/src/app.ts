import express from "express";
import indexRouter from "./routers/index.router";
const app = express();
app.use("/", indexRouter);

export default app;
