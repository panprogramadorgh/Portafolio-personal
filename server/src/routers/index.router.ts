import { Router } from "express";
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.json("hello world");
});

export default indexRouter;
