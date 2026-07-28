// db/orders.js
import db from "../db/client.js";

export async function getOrderProducts(orderId) {
  const SQL = `
  SELECT products.*
  FROM orders_products
  JOIN products ON orders_products.product_id = products.id
  WHERE orders_products.order_id = $1
  ORDER BY products.id
  `;
  const response = await db.query(SQL, [orderId]);
  return response.rows;
}

export async function getOrders(userId) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE user_id = $1
    ORDER BY id
  `;
  const response = await db.query(SQL, [userId]);
  return response.rows;
}

export async function getOrder(id) {
  const SQL = `
    SELECT *
    FROM orders
    WHERE id = $1
  `;
  const response = await db.query(SQL, [id]);
  return response.rows[0];
}

export async function createOrderProduct({ order_id, product_id, quantity }) {
  const SQL = `
    INSERT INTO orders_products (order_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const response = await db.query(SQL, [order_id, product_id, quantity]);
  return response.rows[0];
}

export async function createOrder({ user_id, date }) {
  const SQL = `
    INSERT INTO orders (user_id, date)
    VALUES ($1, $2)
    RETURNING *
  `;
  const response = await db.query(SQL, [user_id, date]);
  return response.rows[0];
}
