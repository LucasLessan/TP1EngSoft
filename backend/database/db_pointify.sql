-- CREATE DATABASE

-- Clear database from old tables
DROP TABLE IF EXISTS 'Users';
DROP TABLE IF EXISTS 'Products';
DROP TABLE IF EXISTS 'Sales';
DROP TABLE IF EXISTS 'SalesItems';

-- Table 01: Users
----------- system users information
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT CHECK(user_type IN ('Gerente', 'Admin', 'Diretor', 'Vendedor')) NOT NULL
);

-- Table 02: Products
----------- products information
CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    desc TEXT,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL
);

-- Table 03: Sales
----------- individual sales information
CREATE TABLE Sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER,
    sale_date TEXT NOT NULL,
    total_value REAL NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES Users(id)
);

-- Table 04: SalesItems
----------- relationship between products and sales
----------- a sale has N entries here for N products sold
CREATE TABLE SalesItems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sale_id INTEGER,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES Sales(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

INSERT INTO Users (id, name, email, password, user_type) VALUES (1, 'Alvaro', 'alvaro@pointify.com', '$2b$10$wv3mIBDkAHsRi72z.4A6QexhZh5HPwAxUwEX/G1sEF60gDwH8NMWu', 'Admin');
INSERT INTO Users (id, name, email, password, user_type) VALUES (2, 'Giulia', 'giulia@pointify.com', '$2b$10$LOKAYiO/U6jUCXx5G0J0i.qZFiL6y0EKl/0N0egu7g7utGTAcn1tm', 'Admin');
INSERT INTO Users (id, name, email, password, user_type) VALUES (3, 'Larissa', 'larissa@pointify.com', '$2b$10$5Dv22euNNLQTKBoDBBuwsOzRak/1AafDcO6VqkzhqWUUc31DaYk7i', 'Admin');
INSERT INTO Users (id, name, email, password, user_type) VALUES (4, 'Lucas', 'lucas@pointify.com', '$2b$10$Ctjzq8pJmwDNIN/mTim.xOJf/cyVy7Qnkh6nEcFFRqy304XL1TCkm', 'Admin');

INSERT INTO Products (id, name, desc, quantity, price) VALUES (1, 'Boxguard', 'Full military bot.', 17, 150000.0);
INSERT INTO Products (id, name, desc, quantity, price) VALUES (2, 'VTOL', 'Vertical Takeoff and Landing vehicle.', 3, 25000000.0);
INSERT INTO Products (id, name, desc, quantity, price) VALUES (3, 'Colt 1911', 'Very reliable firearm.', 250, 1500.0);
