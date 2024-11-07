const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (create it if it doesn't exist)
const db = new sqlite3.Database('sales_app.db');

// User Table Functions

// C: Function to insert a user
function createUser(name, email, password, userType) {
    try {
        db.run("INSERT INTO Users (name, email, password, user_type) VALUES (?, ?, ?, ?)", 
               [name, email, password, userType], function(err) {
            if (err) {
                console.error(`Error inserting user: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in createUser: ${err.message}`);
    }
}

// R: Function to read users with optional filtering
function readUsers(name, email, userType, callback) {
    try {
        let query = "SELECT * FROM Users WHERE 1=1";
        let params = [];

        if (name) {
            query += " AND name = ?";
            params.push(name);
        }
        if (email) {
            query += " AND email = ?";
            params.push(email);
        }
        if (userType) {
            query += " AND user_type = ?";
            params.push(userType);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error(`Error reading users: ${err.message}`);
            }
            callback(err, rows);
        });
    } catch (err) {
        console.error(`Error in readUsers: ${err.message}`);
    }
}

// U: Function to update a user
function updateUser(userId, name, email, password) {
    try {
        let query = "UPDATE Users SET ";
        let params = [];

        if (name) {
            query += "name = ?, ";
            params.push(name);
        }
        if (email) {
            query += "email = ?, ";
            params.push(email);
        }
        if (password) {
            query += "password = ?, ";
            params.push(password);
        }

        query = query.slice(0, -2) + " WHERE id = ?";
        params.push(userId);

        db.run(query, params, function(err) {
            if (err) {
                console.error(`Error updating user: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in updateUser: ${err.message}`);
    }
}

// D: Function to delete a user
function deleteUser(userId) {
    try {
        db.run("DELETE FROM Users WHERE id = ?", userId, function(err) {
            if (err) {
                console.error(`Error deleting user: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in deleteUser: ${err.message}`);
    }
}

// Product Table Functions

// C: Function to insert a product
function createProduct(description, quantity, price) {
    try {
        if (quantity < 0 || price < 0) {
            throw new Error("Quantity and price must be non-negative.");
        }

        db.run("INSERT INTO Products (description, quantity, price) VALUES (?, ?, ?)", 
               [description, quantity, price], function(err) {
            if (err) {
                console.error(`Error inserting product: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in createProduct: ${err.message}`);
    }
}

// R: Function to read products with optional filtering
function readProducts(description, quantity, price, callback) {
    try {
        let query = "SELECT * FROM Products WHERE 1=1";
        let params = [];

        if (description) {
            query += " AND description = ?";
            params.push(description);
        }
        if (quantity) {
            query += " AND quantity = ?";
            params.push(quantity);
        }
        if (price) {
            query += " AND price = ?";
            params.push(price);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error(`Error reading products: ${err.message}`);
            }
            callback(err, rows);
        });
    } catch (err) {
        console.error(`Error in readProducts: ${err.message}`);
    }
}

// U: Function to update a product
function updateProduct(productId, description, quantity, price) {
    try {
        let query = "UPDATE Products SET ";
        let params = [];

        if (description) {
            query += "description = ?, ";
            params.push(description);
        }
        if (quantity) {
            query += "quantity = ?, ";
            params.push(quantity);
        }
        if (price) {
            query += "price = ?, ";
            params.push(price);
        }

        query = query.slice(0, -2) + " WHERE id = ?";
        params.push(productId);

        db.run(query, params, function(err) {
            if (err) {
                console.error(`Error updating product: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in updateProduct: ${err.message}`);
    }
}

// D: Function to delete a product
function deleteProduct(productId) {
    try {
        db.run("DELETE FROM Products WHERE id = ?", productId, function(err) {
            if (err) {
                console.error(`Error deleting product: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in deleteProduct: ${err.message}`);
    }
}

// Sales Table Functions

// C: Function to insert a sale
function createSale(sellerId, totalValue, paymentMethod, installment, numberOfInstallments, 
                    installmentValue, discount) {
    try {
        db.run(`
            INSERT INTO Sales (seller_id, sale_date, total_value, payment_method, installment, 
                               number_of_installments, installment_value, discount) 
            VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?)`, 
            [sellerId, totalValue, paymentMethod, installment, numberOfInstallments, 
             installmentValue, discount], function(err) {
            if (err) {
                console.error(`Error creating sale: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in createSale: ${err.message}`);
    }
}

// R: Function to read sales with optional filtering
function readSales(sellerId, saleDate, totalValue, paymentMethod, 
                   installment, numberOfInstallments, discount, callback) {
    try {
        let query = "SELECT * FROM Sales WHERE 1=1";
        let params = [];

        if (sellerId) {
            query += " AND seller_id = ?";
            params.push(sellerId);
        }
        if (saleDate) {
            query += " AND sale_date = ?";
            params.push(saleDate);
        }
        if (totalValue) {
            query += " AND total_value = ?";
            params.push(totalValue);
        }
        if (paymentMethod) {
            query += " AND payment_method = ?";
            params.push(paymentMethod);
        }
        if (installment) {
            query += " AND installment = ?";
            params.push(installment);
        }
        if (numberOfInstallments) {
            query += " AND number_of_installments = ?";
            params.push(numberOfInstallments);
        }
        if (discount) {
            query += " AND discount = ?";
            params.push(discount);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error(`Error reading sales: ${err.message}`);
            }
            callback(err, rows);
        });
    } catch (err) {
        console.error(`Error in readSales: ${err.message}`);
    }
}

// U: Function to update a sale
function updateSale(saleId, sellerId, saleDate, totalValue, 
                    paymentMethod, installment, numberOfInstallments, 
                    installmentValue, discount) {
    try {
        let query = "UPDATE Sales SET ";
        let params = [];

        if (sellerId) {
            query += "seller_id = ?, ";
            params.push(sellerId);
        }
        if (saleDate) {
            query += "sale_date = ?, ";
            params.push(saleDate);
        }
        if (totalValue) {
            query += "total_value = ?, ";
            params.push(totalValue);
        }
        if (paymentMethod) {
            query += "payment_method = ?, ";
            params.push(paymentMethod);
        }
        if (installment) {
            query += "installment = ?, ";
            params.push(installment);
        }
        if (numberOfInstallments) {
            query += "number_of_installments = ?, ";
            params.push(numberOfInstallments);
        }
        if (installmentValue) {
            query += "installment_value = ?, ";
            params.push(installmentValue);
        }
        if (discount) {
            query += "discount = ?, ";
            params.push(discount);
        }

        query = query.slice(0, -2) + " WHERE id = ?";
        params.push(saleId);

        db.run(query, params, function(err) {
            if (err) {
                console.error(`Error updating sale: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in updateSale: ${err.message}`);
    }
}

// D: Function to delete a sale
function deleteSale(saleId) {
    try {
        db.run("DELETE FROM Sales WHERE id = ?", saleId, function(err) {
            if (err) {
                console.error(`Error deleting sale: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in deleteSale: ${err.message}`);
    }
}

// SalesItems Table Functions

// C: Function to add products to a sale
function createSaleItem(saleId, productId, quantity, price) {
    try {
        if (quantity < 0 || price < 0) {
            throw new Error("Quantity and price must be non-negative.");
        }
        db.run("INSERT INTO SalesItems (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", 
               [saleId, productId, quantity, price], function(err) {
            if (err) {
                console.error(`Error creating sale item: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in createSaleItem: ${err.message}`);
    }
}

// R: Function to read products in one or multiple sales with optional filtering
function readProductsInSale(saleIds, productId, quantity, price, callback) {
    try {
        let query = `
        SELECT SalesItems.id, Products.description, SalesItems.quantity, SalesItems.price
        FROM SalesItems
        JOIN Products ON SalesItems.product_id = Products.id
        WHERE SalesItems.sale_id IN (${saleIds.map(() => '?').join(', ')})`;
        let params = saleIds;

        if (productId) {
            query += " AND SalesItems.product_id = ?";
            params.push(productId);
        }
        if (quantity) {
            query += " AND SalesItems.quantity = ?";
            params.push(quantity);
        }
        if (price) {
            query += " AND SalesItems.price = ?";
            params.push(price);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                console.error(`Error reading sale items: ${err.message}`);
            }
            callback(err, rows);
        });
    } catch (err) {
        console.error(`Error in readProductsInSale: ${err.message}`);
    }
}

// U: Function to update a product in a sale
function updateSaleItem(saleItemId, quantity, price) {
    try {
        db.run("UPDATE SalesItems SET quantity = ?, price = ? WHERE id = ?", 
               [quantity, price, saleItemId], function(err) {
            if (err) {
                console.error(`Error updating sale item: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in updateSaleItem: ${err.message}`);
    }
}

// D: Function to delete a product from a sale
function deleteSaleItem(saleItemId) {
    try {
        db.run("DELETE FROM SalesItems WHERE id = ?", saleItemId, function(err) {
            if (err) {
                console.error(`Error deleting sale item: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in deleteSaleItem: ${err.message}`);
    }
}

module.exports = {
    createUser,
    readUsers,
    updateUser,
    deleteUser,
    createProduct,
    readProducts,
    updateProduct,
    deleteProduct,
    createSale,
    readSales,
    updateSale,
    deleteSale,
    createSaleItem,
    readProductsInSale,
    updateSaleItem,
    deleteSaleItem,
};
