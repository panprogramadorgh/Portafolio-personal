import Contact from "../models/contact.model.js";
import { createVerificationCode, generateViewFromCode } from "../func/utils.js";
import nodemailer from "nodemailer";
import Skill from "../models/skill.model.js";
import Project from "../models/project.model.js";
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

indexRouter.post("/contact-request", async (req, res) => {
  const { body } = req;
  const { name, email, message } = body;
  const contactRequest = new Contact({ name, email, message });
  try {
    await contactRequest.save();
    res.status(200).json({
      status: 200,
      message: "New contact request pushed to db collection successfully !",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message:
        "Mongoose error: something went wrong when saving document in the collection",
    });
  }
});

indexRouter.post("/email-verification", async (req, res) => {
  /* pushing mongoose document section */
  const { body } = req;
  const { name, email, message } = body;
  const verificationCode = createVerificationCode(5);
  try {
    await new Contact({ name, email, message }).validate();
    res.status(200).json({
      status: 200,
      message: "Email verification sended successfully !",
      verificationCode,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Mongoose validation error",
    });
    return;
  }

  /* nodemailer section */
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "barreroalvaro2007@gmail.com",
      pass: "olsejezwxdyswjcz",
    },
  });
  transporter.verify((error) => {});
  const view = generateViewFromCode(verificationCode);
  const nodemailerMessage = {
    from: "barreroalvaro2007@gmail.com",
    to: "barreroalvaro2007@gmail.com",
    subject: "test email",
    html: view,
  };
  transporter.sendMail(nodemailerMessage, (error) => {
    if (error)
      return res.status(500).json({
        status: 500,
        message: "Nodemailer error: an error happends when sending the email !",
      });
  });
});

export default indexRouter;
