import dotenv from "dotenv";
dotenv.config();
import CryptoJS from "crypto-js";
import { createVerificationCode, generateViewFromCode } from "../func/utils.js";
import nodemailer from "nodemailer";
import Skill from "../models/skill.model.js";
import Project from "../models/project.model.js";
import { Router } from "express";
const indexRouter = Router();

indexRouter.get("/skills", async (req, res) => {
  /* TODO: Ocultar id de los documentos */
  try {
    const skills = await Skill.find();
    const response = {
      status: 200,
      message: skills,
    };
    res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

indexRouter.get("/projects", async (req, res) => {
  /* TODO: Ocultar id de los documentos */
  try {
    const projects = await Project.find();
    const response = {
      status: 200,
      message: projects,
    };
    res.status(response.status).json(response);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

// TODO: Arreglar problema de segurar con un middleware para que no se pueda hacer una http request a este endpoint a no ser que se haya enviado el email
indexRouter.post("/contact/request", async (req, res) => {
  const { body } = req;
  const { name, email, message } = body;
  const contactRequest = new Contact({ name, email, message });
  await contactRequest.save();
  res.status(200).json({
    status: 200,
    message: "New contact request pushed to db collection successfully !",
  });
});

indexRouter.post("/contact/verification", async (req, res) => {
  const { body } = req;
  const { name: unTrimmedName, email: unTrimmedEmail } = body;
  const name = unTrimmedName.trim();
  const email = unTrimmedEmail.trim();

  const verificationCode = createVerificationCode(5);
  const encryptedVerificationCode = CryptoJS.AES.encrypt(
    verificationCode.toString(),
    process.env.ENCRYPTION_KEY
  ).toString();

  // crea y verifica transporter
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    await transporter.verify();

    // genera la view y manda el mail
    const view = generateViewFromCode({ verificationCode, name });
    const nodemailerMessage = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Contact request | Verification code",
      html: view,
    };
    transporter.sendMail(nodemailerMessage);

    // respuesta de que todo salio bien
    res.status(200).json({
      status: 200,
      message: "Email verification sended !",
      encryptedVerificationCode,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ...error, status: 500 });
  }
});

export default indexRouter;
