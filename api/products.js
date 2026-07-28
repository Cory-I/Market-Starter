/* api/products.js */
import express from "express";
import { isLoggedIn } from "#middleware/authMiddleware";
import { getProductsOrder, getProducts, getProduct } from "../db/products";
import db from "../db/client.js";
const productsRouter = express.Router();

/* attempted GET/products/:id */
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await getProduct(productId);
    if (!product) {
      return res.status(404).send("No product by that id exists");
    }
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});
/* attempted GET/products/:id/orders */
productsRouter.get("/:id/orders", isLoggedIn, async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const userId = req.user.id;
    const product = await getProduct(productId);
    if (!product) {
      return res.status(404).send("No product by that id exists");
    }
    const productsOrder = await getProductsOrder(productId, userId);
    if (productsOrder.length === 0) {
      return res.status(403).send("Forbidden");
    }
    res.status(200).send(productsOrder);
  } catch (err) {
    next(err);
  }
});

/* attempted GET/products */
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
});
export default productsRouter;
