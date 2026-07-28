/* db/users */
import db from "../db/client.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/jwt.js";

export async function findUserWithToken(token) {
  const { id } = verifyToken(token);
  return getUserById(id);
}
export async function getUserById(id) {
  const SQL = `SELECT * FROM users WHERE id = $1`;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

export const createUser = async (user) => {
  if (!user.username.trim() || !user.password.trim()) {
    throw Error("must have username and password");
  }

  user.password = await bcrypt.hash(user.password, 12);

  const SQL = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *
    `;

  const response = await db.query(SQL, [user.username, user.password]);
  return response.rows[0];
};
export async function getUserByUsername(username) {
  const SQL = `
    SELECT *
    FROM users
    WHERE username = $1
    `;
  const { rows } = await db.query(SQL, [username]);
  return rows[0];
}
