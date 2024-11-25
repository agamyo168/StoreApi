import Client from '../database/database';
import bcrypt from 'bcrypt';
export type User = {
  id?: string | number;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
const SALT = process.env.BCRYPT_SALT_ROUNDS;
const PEPPER = process.env.BCRYPT_SECRET_PASS;
const SCHEMA = process.env.DB_SCHEMA;
class Users {
  static create = async (user: User): Promise<User> => {
    try {
      const conn = await Client.connect();
      const salt = await bcrypt.genSalt(Number(SALT));
      const hash = await bcrypt.hash(user.password + PEPPER, salt);
      const sql = `
          INSERT INTO ${SCHEMA}.users (username, password, firstName, lastName)
          VALUES ($1, $2, $3, $4)
          RETURNING id, username, firstName, lastName
      `;
      const result = await conn.query(sql, [
        user.username,
        hash,
        user.firstName,
        user.lastName,
      ]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't create user. Error:${err}`);
    }
  };
  static findByName = async (username: string): Promise<User> => {
    try {
      const conn = await Client.connect();
      const sql = `
    SELECT * 
    FROM ${SCHEMA}.users
    WHERE username = $1
    `;
      const result = await conn.query(sql, [username]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Error: ${err}`);
    }
  };

  static findById = async (id: string | number | undefined): Promise<User> => {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT * 
      FROM ${SCHEMA}.users
      WHERE id = $1
      `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Error: ${err}`);
    }
  };

  static findAll = async (): Promise<User[]> => {
    try {
      const conn = await Client.connect();
      const sql = `
    SELECT * 
    FROM ${SCHEMA}.users
    `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(`Error: ${err}`);
    }
  };

  static removeById = async (id: string | number | undefined) => {
    try {
      const conn = await Client.connect();
      const sql = `
      DELETE
      FROM ${SCHEMA}.users
      WHERE id = $1
      `;
      await conn.query(sql, [id]);
      conn.release();
    } catch (err) {
      console.error(err);
      throw new Error(`Error: ${err}`);
    }
  };
  static removeByName = async (username: string) => {
    try {
      const conn = await Client.connect();
      const sql = `
      DELETE
      FROM ${SCHEMA}.users
      WHERE username = $1
      `;
      await conn.query(sql, [username]);
      conn.release();
    } catch (err) {
      console.error(err);
      throw new Error(`Error: ${err}`);
    }
  };
}
export default Users;
