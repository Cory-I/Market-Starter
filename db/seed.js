import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const SQL = `
  INSERT INTO users (username, password) VALUES ('johnDoe', 'johnHuman'), ('janeDoe', 'janeHuman');
  INSERT INTO products (title, description, price) VALUES 
  ('title1', 'description1', 2.5),
  ('title2', 'description2', 2.5),
  ('title3', 'description3', 2.5),
  ('title4', 'description4', 2.5),
  ('title5', 'description5', 2.5),
  ('title6', 'description6', 2.5),
  ('title7', 'description7', 2.5),
  ('title8', 'description8', 2.5),
  ('title9', 'description9', 2.5),
  ('title10', 'description10', 2.5);
  INSERT INTO orders (date, note, user_id) VALUES 
  ('2026-10-15', 'genericNote', 1),
  ('2026-10-15', 'genericNote', 1);
  INSERT INTO orders_products (order_id, product_id, quantity) VALUES 
  (1, 2, 1),
  (1, 3, 2),
  (1, 4, 3),
  (1, 5, 4),
  (1, 6, 5),
  (2, 3, 4);
`;
  await db.query(SQL);
}
