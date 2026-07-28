/* api/products.js */
import express from "express";
import { isLoggedIn } from "#middleware/authMiddleware";
import db from "../db/client.js";
const productsRouter = express.Router();
