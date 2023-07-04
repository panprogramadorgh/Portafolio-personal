import Skill from "../models/skill.model.js";
import Project from "../models/project.model.js";
import Contact from "../models/contact.model.js";
import { Router } from "express";
const indexRouter = Router();

indexRouter.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json(error);
  }
});

indexRouter.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

indexRouter.post("/contact", async (req, res) => {
  console.log(req.body);
  const contactRequest = new Contact(req.body);
  try {
    await contactRequest.save();
    res.status(200).json({
      message: "New contact request added.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to post new contact request.",
    });
  }
});

export default indexRouter;
