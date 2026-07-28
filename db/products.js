// db/products.js
import db from "../db/client.js";

export async function getProductsOrder(productId, userId) {
  const SQL = `
    SELECT orders.*
    FROM orders
    JOIN orders_products ON orders.id = orders_products.order_id
    WHERE orders_products.product_id = $1
    AND orders.user_id = $2
    ORDER BY orders.id
  `;
  const response = await db.query(SQL, [productId, userId]);
  return response.rows;
}

export async function getProduct(productId) {
  const SQL = `
    SELECT *
    FROM products
    WHERE id = $1
  `;
  const response = await db.query(SQL, [productId]);
  return response.rows[0];
}

export async function getProducts() {
  const SQL = `
    SELECT *
    FROM products
    ORDER BY id
  `;
  const response = await db.query(SQL);
  return response.rows;
}
