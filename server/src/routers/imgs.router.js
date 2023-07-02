import { Router } from "express";
const imgsRouter = Router();

imgsRouter.get("/skills", async (req, res) => {
  const { imgName } = req.query;
  if (!imgName) res.status(500).json("No img name sended.");
  const path = `/imgs/skills/${imgName}.png`;
  res.redirect(path);
});

export default imgsRouter;
