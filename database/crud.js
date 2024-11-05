const Database = require('better-sqlite3');
const db = new Database('sales_app.db');

// USER TABLE

// C: Function to insert a user
function createUser(name, email, password, userType) {
    const stmt = db.prepare("INSERT INTO Users (name, email, password, user_type) VALUES (?, ?, ?, ?)");
    stmt.run(name, email, password, userType);
}

// R: Function to read users
function readUsers() {
    const stmt = db.prepare("SELECT * FROM Users");
    return stmt.all();
}

// U: Function to update a user
function updateUser(userId, name, email) {
    const stmt = db.prepare("UPDATE Users SET name = ?, email = ? WHERE id = ?");
    stmt.run(name, email, userId);
}

// D: Function to delete a user
function deleteUser(userId) {
    const stmt = db.prepare("DELETE FROM Users WHERE id = ?");
    stmt.run(userId);
}

// PRODUCTS TABLE

// C: Function to insert a product
function createProduct(description, quantity, price) {
    const stmt = db.prepare("INSERT INTO Products (description, quantity, price) VALUES (?, ?, ?)");
    stmt.run(description, quantity, price);
}

// R: Function to read products
function readProducts() {
    const stmt = db.prepare("SELECT * FROM Products");
    return stmt.all();
}

// U: Function to update a product
function updateProduct(productId, description, quantity, price) {
    const stmt = db.prepare("UPDATE Products SET description = ?, quantity = ?, price = ? WHERE id = ?");
    stmt.run(description, quantity, price, productId);
}

// D: Function to delete a product
function deleteProduct(productId) {
    const stmt = db.prepare("DELETE FROM Products WHERE id = ?");
    stmt.run(productId);
}

// SALES TABLE

// C: Function to insert a sale
function createSale(sellerId, saleDate, totalValue) {
    const stmt = db.prepare("INSERT INTO Sales (seller_id, sale_date, total_value) VALUES (?, ?, ?)");
    stmt.run(sellerId, saleDate, totalValue);
}

// R: Function to read sales
function readSales() {
    const stmt = db.prepare("SELECT * FROM Sales");
    return stmt.all();
}

// U: Function to update a sale
function updateSale(saleId, sellerId, saleDate, totalValue) {
    const stmt = db.prepare("UPDATE Sales SET seller_id = ?, sale_date = ?, total_value = ? WHERE id = ?");
    stmt.run(sellerId, saleDate, totalValue, saleId);
}

// D: Function to delete a sale
function deleteSale(saleId) {
    const stmt = db.prepare("DELETE FROM Sales WHERE id = ?");
    stmt.run(saleId);
}

// SALESITEMS TABLE

// C: Function to add products to a sale
function createSaleItem(saleId, productId, quantity, price) {
    const stmt = db.prepare("INSERT INTO SalesItems (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
    stmt.run(saleId, productId, quantity, price);
}

// R: Function to read products in a sale
function readProductsInSale(saleId) {
    const stmt = db.prepare(`
        SELECT SalesItems.id, Products.description, SalesItems.quantity, SalesItems.price
        FROM SalesItems
        JOIN Products ON SalesItems.product_id = Products.id
        WHERE SalesItems.sale_id = ?
    `);
    return stmt.all(saleId);
}

// U: Function to update a product in a sale
function updateSaleItem(saleItemId, quantity, price) {
    const stmt = db.prepare("UPDATE SalesItems SET quantity = ?, price = ? WHERE id = ?");
    stmt.run(quantity, price, saleItemId);
}

// D: Function to delete a product from a sale
function deleteSaleItem(saleItemId) {
    const stmt = db.prepare("DELETE FROM SalesItems WHERE id = ?");
    stmt.run(saleItemId);
}

// Close the database connection when done
db.close();
