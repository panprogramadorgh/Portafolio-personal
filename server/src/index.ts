import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import database from "./db";

database();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
