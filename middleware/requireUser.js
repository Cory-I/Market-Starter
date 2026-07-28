/* requireUser/requireUser */
/** Requires a logged-in user */
import db from "../db/client.js";
export default async function requireUser(req, res, next) {
  if (!req.user) return res.status(401).send("Unauthorized");
  next();
}
