/* Replace with your SQL commands */
CREATE TYPE ORDER_STATUS AS ENUM('active', 'complete');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    current_status ORDER_STATUS,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX idx_user_active_order ON orders (user_id, current_status);