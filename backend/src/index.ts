import express from "express";
import router from "./routers/router";
import cors from "cors";

const app = express();
app.use("/api", express.static("./public"));
app.use(router);

app.use((req, res, err) => {
  res.status(404).json("Not Found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running server at ${PORT}...`));
