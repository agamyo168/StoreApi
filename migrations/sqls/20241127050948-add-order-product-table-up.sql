/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS order_product (
    order_id INT,
    product_id INT,
    quantity INT,
    CONSTRAINT order_product_pkey PRIMARY KEY(order_id, product_id),
    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)
)