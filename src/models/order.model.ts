import Client from '../database/database';
import { Product } from '../types';
import logger from '../utils/logger';
import OrderProducts from './order_product.model';
export const enum CurrentStatus {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}
export interface OrderItem extends Product {
  quantity: number;
}
export interface Order {
  id?: number;
  currentStatus: CurrentStatus;
  userId: string | number | undefined;
  products: OrderItem[];
}
const SCHEMA = process.env.DB_SCHEMA || 'public';
export default class Orders {
  static create = async (order: Order) => {
    try {
      const conn = await Client.connect();
      const sql = `
        INSERT INTO ${SCHEMA}.orders(user_id, current_status)
        VALUES ($1, $2)
        RETURNING id, current_status, user_id
        `;
      const result = await conn.query(sql, [order.userId, order.currentStatus]);
      conn.release();
      //Add products
      const orderItems = await Promise.all(
        order.products.map(async (product) => {
          const order_id = result.rows[0].id;
          const product_id = product.id as number;
          const quantity = product.quantity;
          const item = await OrderProducts.create({
            order_id,
            product_id,
            quantity,
          });
          return item;
        })
      );
      return { ...result.rows[0], orderItems };
    } catch (err) {
      logger.error(err);
      throw new Error(`${err}`);
    }
  };
  static findAll = async (userId: number) => {
    try {
      const conn = await Client.connect();
      let sql = `
      SELECT *
      FROM ${SCHEMA}.orders o
      WHERE o.user_id = $1
        `;
      const orders = await conn.query(sql, [userId]);
      sql = `
      SELECT p.id, op.quantity,p.name,p.price,p.category
      FROM ${SCHEMA}.order_product op INNER JOIN ${SCHEMA}.products p ON p.id = op.product_id
      WHERE op.order_id = $1
        `;
      const allOrders = await Promise.all(
        orders.rows.map(async (order) => {
          const orderItems = (await conn.query(sql, [order.id])).rows;
          return { ...order, orderItems };
        })
      );
      conn.release();
      return allOrders;
    } catch (err) {
      logger.error(err);
      throw new Error(`${err}`);
    }
  };

  static reset = async () => {
    try {
      const conn = await Client.connect();
      await OrderProducts.reset();
      //query that deletes all rows in users and resets id to 1.
      const sql = `
      TRUNCATE TABLE ${process.env.DB_SCHEMA}.orders RESTART IDENTITY CASCADE;
      `;
      await conn.query(sql);
      conn.release();
    } catch (error) {
      throw new Error(`Couldn't delete test orders. ${error}`);
    }
  };
}
