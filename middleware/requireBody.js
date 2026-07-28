/* middleware/requireBody.js */
/** Checks if the request body contains the required fields */
import db from "../db/client.js";
export default function requireBody(fields) {
  return (req, res, next) => {
    if (!req.body) return res.status(400).send("Request body is required.");

    const missing = fields.filter((field) => !(field in req.body));
    if (missing.length > 0)
      return res.status(400).send(`Missing fields: ${missing.join(", ")}`);

    next();
  };
}
