/* api/orders.js */
import express from "express";
import db from "../db/client.js";
import { isLoggedIn } from "#middleware/authMiddleware";

const ordersRouter = express.Router();
