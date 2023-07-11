import dotenv from "dotenv";
dotenv.config();
import validator from "email-validator";
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
  await contactRequest.save();
  res.status(200).json({
    status: 200,
    message: "New contact request pushed to db collection successfully !",
  });
});

indexRouter.post("/email-verification", async (req, res) => {
  const { body } = req;
  const {
    name: unTrimmedName,
    email: unTrimmedEmail,
    message: unTrimmedMessage,
  } = body;
  const name = unTrimmedName.trim();
  const email = unTrimmedEmail.trim();
  const message = unTrimmedMessage.trim();
  const verificationCode = createVerificationCode(5);
  try {
    // comprueba si faltan campos o si el email esta duplicado en la coleccion
    if ([name, email, message].includes(""))
      throw {
        status: 500,
        message: "Empty fields are not allow",
      };
    const duplicatedEmails =
      (await Contact.find()).find(
        ({ email: eachEmail }) => email === eachEmail
      ) !== undefined;
    if (duplicatedEmails)
      throw {
        status: 500,
        message: "You have already sent the contact request",
      };

    // verifica formato del email
    const emailFormatting = validator.validate(email);
    if (emailFormatting === false)
      throw {
        status: 500,
        message: "Invalid email format",
      };

    // crea y verifica transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "barreroalvaro2007@gmail.com",
        pass: process.env.NODEMAILER_PASS,
      },
    });
    await transporter.verify();

    // genera la view y manda el mail
    const view = generateViewFromCode({ verificationCode, name });
    const nodemailerMessage = {
      from: "barreroalvaro2007@gmail.com",
      to: email,
      subject: "Contact request | Verification code",
      html: view,
    };
    transporter.sendMail(nodemailerMessage);

    // respuesta de que todo salio bien
    res.status(200).json({
      status: 200,
      message: "Email verification sended !",
      verificationCode,
    });
  } catch (error) {
    res.status(500).json({ ...error, status: 500 });
    return;
  }
});

export default indexRouter;
