import Skill from "../models/skill.model";
import Project from "../models/project.model";
import { Router } from "express";
const indexRouter = Router();

indexRouter.get("/api/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json(error);
  }
});

indexRouter.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default indexRouter;
