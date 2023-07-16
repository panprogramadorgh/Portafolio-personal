import validator from "email-validator";
import Contact from "../models/contact.model.js";

export default async (req, res, next) => {
  /* Ocultar el codigo de la respuesta, encriptandolo o hacienndo lo que sea posible */
  const { body } = req;
  const {
    name: unTrimmedName,
    email: unTrimmedEmail,
    message: unTrimmedMessage,
  } = body;
  const name = unTrimmedName.trim();
  const email = unTrimmedEmail.trim();
  const message = unTrimmedMessage.trim();
  try {
    // comprueba si faltan campos o si el email esta duplicado en la coleccion
    if ([name, email, message].includes(""))
      throw {
        status: 500,
        message: "Empty fields are not allow",
      };

    // comprueba si ya existe ese email en la base de datos
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
    next();
  } catch (error) {
    res.status(error.status).json(error);
  }
};
