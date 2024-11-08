const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (create it if it doesn't exist)
const db = new sqlite3.Database('sales_app.db');

// User Table Functions

// C: Function to insert a user
async function createUser(name, email, password, userType) {
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
async function readUsers(name=null, email=null, userType=null, callback) {
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
async function updateUser(userId, name=null, email=null, password=null) {
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
async function deleteUser(userId) {
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
async function createProduct(name, description, quantity, price) {
    try {
        if (quantity < 0 || price < 0) {
            throw new Error("Quantity and price must be non-negative.");
        }

        db.run("INSERT INTO Products (name, description, quantity, price) VALUES (?, ?, ?, ?)", 
               [name, description, quantity, price], function(err) {
            if (err) {
                console.error(`Error inserting product: ${err.message}`);
            }
        });
    } catch (err) {
        console.error(`Error in createProduct: ${err.message}`);
    }
}

// R: Function to read products with optional filtering
async function readProducts(name=null, description=null, quantity=null, price=null, callback) {
    try {
        let query = "SELECT * FROM Products WHERE 1=1";
        let params = [];

        if (name) {
            query += " AND name = ?";
            params.push(name);
        }
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
async function updateProduct(productId, name=null, description=null, quantity=null, price=null) {
    try {
        let query = "UPDATE Products SET ";
        let params = [];

        if (name) {
            query += "name = ?, ";
            params.push(name);
        }
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
async function deleteProduct(productId) {
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
async function createSale(sellerId, totalValue, paymentMethod, installment, numberOfInstallments, 
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
async function readSales(sellerId=null, saleDate=null, totalValue=null, paymentMethod=null, 
                   installment=null, numberOfInstallments=null, discount=null, callback) {
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
async function updateSale(saleId, sellerId=null, saleDate=null, totalValue=null, 
                    paymentMethod=null, installment=null, numberOfInstallments=null, 
                    installmentValue=null, discount=null) {
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
async function deleteSale(saleId) {
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
async function createSalesItem(sale_id, product_id, quantity, price) {
    const query = `
        INSERT INTO SalesItems (sale_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
    `;
    const values = [sale_id, product_id, quantity, price];

    try {
        const result = await db.run(query, values);
        return result.lastID; // Return the ID of the new SalesItem
    } catch (error) {
        console.error("Error creating SalesItem:", error);
        throw error;
    }
}

// R: Function to read products in one or multiple sales with optional filtering
async function readSalesItems(saleId=null, productId=null, quantity=null, price=null, callback) {
    try {
        let query = "SELECT * FROM SalesItems WHERE 1=1";
        let params = [];

        if (saleId) {
            query += " AND sale_id = ?";
            params.push(saleId);
        }
        if (productId) {
            query += " AND product_id = ?";
            params.push(productId);
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
                console.error(`Error reading SalesItems: ${err.message}`);
            }
            callback(err, rows);
        });
    } catch (err) {
        console.error(`Error in readSalesItems: ${err.message}`);
    }
}


// U: Function to update a product in a sale
async function updateSalesItem(id, saleId = null, productId = null, quantity = null, price = null) {
    try {
        let query = "UPDATE SalesItems SET ";
        let params = [];

        if (saleId !== null) {
            query += "sale_id = ?, ";
            params.push(saleId);
        }
        if (productId !== null) {
            query += "product_id = ?, ";
            params.push(productId);
        }
        if (quantity !== null) {
            query += "quantity = ?, ";
            params.push(quantity);
        }
        if (price !== null) {
            query += "price = ?, ";
            params.push(price);
        }

        // Remove trailing comma and space, then add WHERE clause
        query = query.slice(0, -2) + " WHERE id = ?";
        params.push(id);

        // Execute the update query
        db.run(query, params, function (err) {
            if (err) {
                console.error(`Error updating SalesItem: ${err.message}`);
            } else {
                console.log(`SalesItem with id ${id} updated successfully.`);
            }
        });
    } catch (err) {
        console.error(`Error in updateSalesItem: ${err.message}`);
    }
}


// D: Function to delete a product from a sale
async function deleteSalesItem(saleId) {
    try {
        db.run("DELETE FROM SalesItems WHERE sale_id = ?", saleId, function(err) {
            if (err) {
                console.error(`Error deleting SalesItem: ${err.message}`);
            } else {
                console.log(`SalesItem with sale_id ${saleId} deleted successfully.`);
            }
        });
    } catch (err) {
        console.error(`Error in deleteSalesItem: ${err.message}`);
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
    createSalesItem,
    readSalesItems,
    updateSalesItem,
    deleteSalesItem,
};
