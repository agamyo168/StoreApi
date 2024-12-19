import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();
const { DB_HOST, DB_NAME, DB_NAME_TEST, DB_USERNAME, DB_PASSWORD, NODE_ENV } =
  process.env;
const DB_SERVER_NAME = NODE_ENV == 'test' ? DB_NAME_TEST : DB_NAME;
const client = new Pool({
  host: DB_HOST,
  database: DB_SERVER_NAME,
  user: DB_USERNAME, //user created with certain privileges to access this database ... NOT THE ADMIN USER (postgres)
  password: DB_PASSWORD,
});
// Define a type for the parameters
type QueryParams = (string | number | boolean | null)[]; // Adjust as needed

export const db = {
  query: (text: string, params?: QueryParams) => {
    return client.query(text, params);
  },
};
export default client;
