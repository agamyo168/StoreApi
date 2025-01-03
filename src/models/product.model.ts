import Client from '../database/database';

export type Product = {
  id?: string | number;
  name: string;
  price: number;
  category: string;
};
const SCHEMA = process.env.DB_SCHEMA;
//Repository?
class Products {
  static create = async (product: Product): Promise<Product> => {
    const conn = await Client.connect();
    const sql = `
    INSERT INTO ${SCHEMA}.products(name,price,category)
    VALUES ($1, $2, $3)
    RETURNING id, name, price, category
    `;
    try {
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't create a product. Error:${err}`);
    }
  };
  static findAll = async (): Promise<Product[]> => {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT * 
      FROM ${SCHEMA}.products
      `;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't fetch all products: ${err}`);
    }
  };
  static findById = async (
    id: string | number | undefined
  ): Promise<Product> => {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT * 
      FROM ${SCHEMA}.products
      WHERE id = $1
      `;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't find a product:${err}`);
    }
  };
  static findByCategory = async (category: string): Promise<Product[]> => {
    try {
      const conn = await Client.connect();
      const sql = `
      SELECT * 
      FROM ${SCHEMA}.products
      WHERE category = $1
      `;
      const result = await conn.query(sql, [category]);

      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't find products by category. ${err}`);
    }
  };
}
export default Products;
