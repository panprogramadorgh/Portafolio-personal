import mongoose from "mongoose";

export default (req, res, next) => {
  /* TODO: Ocultar id de los documentos */
  const connectionState = mongoose.connection.readyState;
  const isDisconnected = [0, 3].includes(connectionState);
  try {
    if (isDisconnected)
      throw {
        status: 500,
        message: "Error connecting to data base",
      };
    else if (connectionState === 2) {
      const response = {
        status: 200,
        message: "Fetching skills...",
      };
      res.status(response.status).json(response);
    } else if (connectionState === 1) {
      next();
    }
  } catch (error) {
    res.status(error.status).json(error);
  }
};
