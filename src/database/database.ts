import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const client = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER, //user created with certain privileges to access this database ... NOT THE ADMIN USER (postgres)
  password: DB_PASS,
});

export default client;