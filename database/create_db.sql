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
    user_type TEXT CHECK(user_type IN ('salesman', 'admin', 'manager')) NOT NULL
);

-- Table 02: Products
----------- products information
CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
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
