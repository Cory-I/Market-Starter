/* middleware/authMiddleware */
import { findUserWithToken } from "../db/users.js";
import db from "../db/client.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ error: "Not logged in" });
    }
    const token = authHeader.replace("Bearer ", "");
    const user = await findUserWithToken(token);
    if (!user) {
      return res.status(401).send({ error: "Invalid token (no user)" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
};
