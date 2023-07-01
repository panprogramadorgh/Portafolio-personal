import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";

export default async function () {
  const connectionString = process.env.URI as
    | string
    | "mongodb://127.0.0.1:27017/portafolio";
  try {
    connect(connectionString);
  } catch (error) {
    console.error(error);
  }
}
