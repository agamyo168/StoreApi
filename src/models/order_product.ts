import Client from '../database/database';

export type order_product = {
  order_id: number;
  product_id: number;
  quantity: number;
};
const { DB_SCHEMA: SCHEMA } = process.env;
class order_products {
  static create = async (order: order_product) => {
    try {
      const conn = await Client.connect();
      const sql = `
        INSERT INTO ${SCHEMA}.order_product (order_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING quantity
        `;
      const result = await conn.query(sql, [
        order.order_id,
        order.product_id,
        order.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't add a new product to order. Error: ${err}`);
    }
  };

  static delete = async () => {};
  static update = async () => {};
}
export default order_products;
