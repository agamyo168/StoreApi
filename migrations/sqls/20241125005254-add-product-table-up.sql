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
    user_id INT,
    current_status ORDER_STATUS,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_active_order ON orders (user_id, current_status);

CREATE TABLE IF NOT EXISTS order_product (
    order_id INT,
    product_id INT,
    quantity INT,
    CONSTRAINT order_product_pkey PRIMARY KEY(order_id, product_id),
    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)
)