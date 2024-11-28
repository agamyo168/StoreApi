import Client from '../database/database';
import bcrypt from 'bcrypt';
import { User } from '../types';

const SALT = process.env.BCRYPT_SALT_ROUNDS;
const PEPPER = process.env.BCRYPT_SECRET_PASS;
const SCHEMA = process.env.DB_SCHEMA;
class Users {
  static create = async (user: User): Promise<User> => {
    try {
      const conn = await Client.connect();
      const salt = await bcrypt.genSalt(Number(SALT));
      const password = `${user.password}${PEPPER}`;
      const hash = await bcrypt.hash(password, salt);
      const sql = `
          INSERT INTO ${SCHEMA}.users (username, password, first_name, last_name)
          VALUES ($1, $2, $3, $4)
          RETURNING id, username, first_name AS "firstName", last_name AS "lastName"
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
      throw new Error(`Couldn't create user. ${err}`);
    }
  };
  static findByName = async (username: string): Promise<User> => {
    try {
      const conn = await Client.connect();
      const sql = `
    SELECT 
        id,
        username, 
        password, 
        first_name AS "firstName", 
        last_name AS "lastName"
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
      SELECT 
          id,
          username, 
          password, 
          first_name AS "firstName", 
          last_name AS "lastName"
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
    SELECT
        id,
        username, 
        password, 
        first_name AS "firstName", 
        last_name AS "lastName" 
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

  //TODO: this is for testing remove it later.
  static reset = async () => {
    try {
      const conn = await Client.connect();

      //query that deletes all rows in users and resets id to 1.
      const sql = `
      TRUNCATE TABLE ${process.env.DB_SCHEMA}.users RESTART IDENTITY CASCADE;
      `;
      await conn.query(sql);
      conn.release();
    } catch (error) {
      throw new Error(`Couldn't delete test user. ${error}`);
    }
  };

  /*
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
  */
}

export default Users;
