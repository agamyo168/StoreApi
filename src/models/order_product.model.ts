import Client from '../database/database';
import logger from '../utils/logger';

export type OrderProduct = {
  order_id: number;
  product_id: number;
  quantity: number;
};
const { DB_SCHEMA: SCHEMA } = process.env;
class OrderProducts {
  static create = async (order: OrderProduct) => {
    try {
      const conn = await Client.connect();
      const sql = `
        INSERT INTO ${SCHEMA}.order_product (order_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING order_id, product_id, quantity
        `;
      const result = await conn.query(sql, [
        order.order_id,
        order.product_id,
        order.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      logger.error(err);
      throw new Error(`Couldn't add a new product to order. Error: ${err}`);
    }
  };
  static getProducts = async (order_id: number) => {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT *
      FROM ${SCHEMA}.order_product
      WHERE order_id = $1
     `;
      const result = await conn.query(sql, [order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      logger.error(err);
      throw new Error(`Couldn't fetch all producs. Error: ${err}`);
    }
  };
  static delete = async () => {};
  static update = async () => {};
}
export default OrderProducts;
