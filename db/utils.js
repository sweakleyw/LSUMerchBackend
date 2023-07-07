const client = require("./client");

async function addProductsToOrder({ order }) {
  const { rows: products } = await client.query(
    `
        SELECT name, description, price, size, quantity
        FROM products p JOIN orders_products ON p.id = "productId"
        WHERE "orderId" = $1;
  `,
    [order.id]
  );

  order.products = products || [];

  return order;
}

module.exports = { addProductsToOrder };