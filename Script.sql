CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  points INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  description TEXT,
  image TEXT,
  price INT,
  owner_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trades(
  id SERIAL PRIMARY KEY,
  user_product_id INT REFERENCES products(id),
  target_product_id INT REFERENCES products(id),
  requester_id INT REFERENCES users(id),
  receiver_id INT REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  trade_id INT REFERENCES trades(id),
  sender_id INT REFERENCES users(id),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
