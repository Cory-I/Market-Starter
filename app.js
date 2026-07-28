/* app */
import express from "express";
import db from "#db/client";
const app = express();
export default app;
import usersRouter from "#api/users";
import morgan from "morgan";
/* import productsRouter from "#api/products";
import ordersRouter from "#api/orders"; */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/users", usersRouter);
/* app.use("/products", productsRouter);
app.use("/orders", ordersRouter); */
app.use((err, req, res, next) => {
  // A switch statement can be used instead of if statements
  // when multiple cases are handled the same way.
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message || "Internal Server Error");
});
