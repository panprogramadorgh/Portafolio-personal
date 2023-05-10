import { Router } from "express";
import { User } from "../utils/types";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/api");
});

router.get("/api", (req, res) => {
  res.json("Hello World");
});

router.get("/api/users", (req, res) => {
  const users: User[] = [
    {
      id: 0,
      name: "Alvaro",
      lastname: "Barrero",
    },
    {
      id: 0,
      name: "Paco",
      lastname: "Hernandez",
    },
  ];

  res.json(users);
});

export default router;
