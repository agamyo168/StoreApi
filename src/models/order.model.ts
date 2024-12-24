import Client from '../database/database';
import { Order } from '../types/order.type';
import Options from '../types/query-options.type';
import logger from '../utils/logger';
import OrderProducts from './order_product.model';

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
      let orderItems = [];
      if (order.products) {
        orderItems = await Promise.all(
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
      }

      return { ...result.rows[0], orderItems };
    } catch (err) {
      logger.error(err);
      throw new Error(`${err}`);
    }
  };
  static findAll = async (options?: Options<Order>) => {
    try {
      const conn = await Client.connect();
      const values = [];
      let addQuery = '\n';
      if (options) {
        const { currentStatus, userId, id } = options.where;
        const { offset, limit } = options;
        let count = 1;
        if (userId) {
          addQuery += `WHERE o.user_id = $${count}`;
          count++;
          values.push(userId);
        }
        if (currentStatus) {
          addQuery += `\nAND o.current_status = $${count}`;
          count++;
          values.push(currentStatus);
        }
        if (id) {
          addQuery += `\nAND o.id = $${count}`;
          count++;
          values.push(id);
        }
        // if (sort) {
        //   const sortClause = Array.isArray(sort) ? sort.join(', ') : sort;
        //   addQuery += '\nORDER BY ' + sortClause;
        // }

        if (limit) addQuery += '\nLIMIT ' + limit;
        if (offset) addQuery += '\nOFFSET ' + offset;
      }

      let sql = `
      SELECT *
      FROM ${SCHEMA}.orders o ${addQuery};`;
      const orders = await conn.query(sql, values);
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
  static completeOrder = async (userId: number, orderId: number) => {
    try {
      const conn = await Client.connect();
      const sql = `
      UPDATE ${SCHEMA}.orders
      SET current_status = 'complete'
      WHERE user_id = $1 AND id = $2
      RETURNING id, current_status, user_id
      `;
      const order = await conn.query(sql, [userId, orderId]);

      conn.release();
      return order.rows[0];
    } catch (err) {
      logger.error(err);
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
