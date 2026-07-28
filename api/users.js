/* api/users */
import express from "express";
import db from "../db/client.js";
import { createUser, getUserByUsername } from "../db/users.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { createToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
const usersRouter = express.Router();

/* Likley not this */
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).send("Missing username or password");
    const existing = await getUserByUsername(username);
    if (existing) return res.status(400).send("Username already taken");
    const user = await createUser({ username, password });
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  } catch (err) {
    next(err);
  }
});

/* 
usersRouter.get("/", async (req, res, next) => {
  res.send("yayyy");
}) */
/* LIKLEY NOT THIS */
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) return res.status(401).send("Invalid credentials");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send("Invalid credentials");

    const token = createToken({ id: user.id });
    res.send(token);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/me", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});
export default usersRouter;
