import dotenv from "dotenv";
dotenv.config();
import { connect } from "mongoose";

export default async function () {
  const connectionString = process.env.URI;
  try {
    connect(connectionString);
    console.log('>>> Connected to database.')
  } catch (error) {
    console.error(error);
  }
}
