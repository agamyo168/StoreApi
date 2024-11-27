import Client from '../database/database';
export const enum CurrentStatus {
  ACTIVE = 'active',
  COMPLETE = 'complete',
}
export interface Order {
  id?: number;
  currentStatus: CurrentStatus;
  userId: string | number | undefined;
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
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`${err}`);
    }
  };
}
