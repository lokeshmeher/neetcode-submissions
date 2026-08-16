CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  stock INTEGER DEFAULT 0
);

-- Do not modify above this line --

INSERT INTO products (name)
VALUES
    ('Apple'),
    ('Banana'),
    ('Orange');



-- Do not modify below this line --
SELECT * FROM products;
