-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS intercambiogo
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE intercambiogo;

-- 2. Tabla de usuarios (users)
-- Basada en models/Users.js: id, name, email, password, points, created_at
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  points     INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabla de productos (products)
-- Basada en models/Products.js: id, title, description, image, price, owner_id, created_at
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(150) NOT NULL,
  description TEXT,
  image       VARCHAR(255),
  price       DECIMAL(10,2) NOT NULL DEFAULT 0,
  owner_id    INT NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_owner
    FOREIGN KEY (owner_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabla de intercambios (trades)
-- Basada en models/Trades.js: id, user_product_id, target_product_id, requester_id, receiver_id, status, created_at
CREATE TABLE trades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_product_id   INT NOT NULL,
  target_product_id INT NOT NULL,
  requester_id      INT NOT NULL,
  receiver_id       INT NOT NULL,
  status ENUM('pendiente','aceptado','rechazado')
        NOT NULL DEFAULT 'pendiente',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_trades_user_product
    FOREIGN KEY (user_product_id) REFERENCES products(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_trades_target_product
    FOREIGN KEY (target_product_id) REFERENCES products(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_trades_requester
    FOREIGN KEY (requester_id) REFERENCES users(id),
  CONSTRAINT fk_trades_receiver
    FOREIGN KEY (receiver_id) REFERENCES users(id)
) ENGINE=InnoDB;

-- 5. Tabla de mensajes (messages)
-- Basada en models/Messages.js: id, trade_id, sender_id, message, created_at
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trade_id   INT NOT NULL,
  sender_id  INT NOT NULL,
  message    TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_messages_trade
    FOREIGN KEY (trade_id) REFERENCES trades(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_messages_sender
    FOREIGN KEY (sender_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE INDEX idx_products_owner ON products(owner_id);
CREATE INDEX idx_trades_requester ON trades(requester_id);
CREATE INDEX idx_trades_receiver ON trades(receiver_id);
CREATE INDEX idx_messages_trade ON messages(trade_id);
