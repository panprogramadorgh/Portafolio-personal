import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import database from "./db.js";

database();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
