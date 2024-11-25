/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    price INTEGER,
    category VARCHAR(20)
);

CREATE TYPE ORDER_STATUS AS ENUM('active', 'complete');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    current_status ORDER_STATUS,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES user(id)
);