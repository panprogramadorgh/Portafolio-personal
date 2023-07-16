import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";

export default async function () {
  const connectionString = process.env.URI;
  try {
    await connect(connectionString);
    console.log(">>> Connected to database.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
