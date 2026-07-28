// api/orders.js
import express from "express";
import db from "../db/client.js";
import { isLoggedIn } from "#middleware/authMiddleware";
import {
  getOrderProducts,
  createOrderProduct,
  createOrder,
  getOrder,
  getOrders,
} from "../db/orders.js";

const ordersRouter = express.Router();

// GET /orders/:id/products
ordersRouter.get("/:id/products", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await db.query("SELECT * FROM orders WHERE id = $1", [
      orderId,
    ]);
    if (order.rows.length === 0) {
      return res.status(404).send("No order by that id exists");
    }

    if (order.rows[0].user_id !== req.user.id) {
      return res.status(403).send("Forbidden");
    }

    const products = await getOrderProducts(orderId);
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
});

// POST /orders/:id/products
ordersRouter.post("/:id/products", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    if (!productId || !quantity) {
      return res.status(400).send("Missing productId or quantity");
    }
    const order = await db.query("SELECT * FROM orders WHERE id = $1", [
      orderId,
    ]);
    if (order.rows.length === 0) {
      return res.status(404).send("Order not found");
    }
    if (order.rows[0].user_id !== req.user.id) {
      return res.status(403).send("Forbidden");
    }
    const product = await db.query("SELECT * FROM products WHERE id = $1", [
      productId,
    ]);
    if (product.rows.length === 0) {
      return res.status(400).send("Product does not exist");
    }
    const newOrderProduct = await createOrderProduct({
      order_id: orderId,
      product_id: productId,
      quantity,
    });
    res.status(201).send(newOrderProduct);
  } catch (err) {
    next(err);
  }
});

// GET /orders/:id
ordersRouter.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await getOrder(orderId);

    if (!order) {
      return res.status(404).send("No order by that id exists");
    }

    if (order.user_id !== req.user.id) {
      return res.status(403).send("Forbidden");
    }

    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
});

// POST /orders
ordersRouter.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { date } = req.body;

    if (!date) {
      return res.status(400).send("Missing date");
    }

    const order = await createOrder({ user_id: userId, date });
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

// GET /orders
ordersRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await getOrders(userId);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});

export default ordersRouter;
