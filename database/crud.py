import sqlite3

# Connect to the SQLite database (create it if it doesn't exist)
conn = sqlite3.connect('sales_app.db')

# Create a cursor object to execute SQL queries
cur = conn.cursor()

"""USER TABLE"""

# C: Function to insert a user
def create_user(name, email, password, user_type):
    cur.execute("INSERT INTO Users (name, email, password, user_type) VALUES (?, ?, ?, ?)", 
                (name, email, password, user_type))
    conn.commit()

# R: Function to read users
def read_users():
    cur.execute("SELECT * FROM Users")
    return cur.fetchall()

# U: Function to update a user
def update_user(user_id, name, email):
    cur.execute("UPDATE Users SET name = ?, email = ? WHERE id = ?", 
                (name, email, user_id))
    conn.commit()

# D: Function to delete a user
def delete_user(user_id):
    cur.execute("DELETE FROM Users WHERE id = ?", (user_id,))
    conn.commit()


"""PRODUCTS TABLE"""

# C: Function to insert a product
def create_product(description, quantity, price):
    cur.execute("INSERT INTO Products (description, quantity, price) VALUES (?, ?, ?)", 
                (description, quantity, price))
    conn.commit()

# R: Function to read products
def read_products():
    cur.execute("SELECT * FROM Products")
    return cur.fetchall()

# U: Function to update a product
def update_product(product_id, description, quantity, price):
    cur.execute("UPDATE Products SET description = ?, quantity = ?, price = ? WHERE id = ?", 
                (description, quantity, price, product_id))
    conn.commit()

# D: Function to delete a product
def delete_product(product_id):
    cur.execute("DELETE FROM Products WHERE id = ?", (product_id,))
    conn.commit()


"""SALES TABLE"""

# C: Function to insert a sale
def create_sale(seller_id, sale_date, total_value):
    cur.execute("INSERT INTO Sales (seller_id, sale_date, total_value) VALUES (?, ?, ?)", 
                (seller_id, sale_date, total_value))
    conn.commit()

# R: Function to read sales
def read_sales():
    cur.execute("SELECT * FROM Sales")
    return cur.fetchall()

# U: Function to update a sale
def update_sale(sale_id, seller_id, sale_date, total_value):
    cur.execute("UPDATE Sales SET seller_id = ?, sale_date = ?, total_value = ? WHERE id = ?", 
                (seller_id, sale_date, total_value, sale_id))
    conn.commit()

# D: Function to delete a sale
def delete_sale(sale_id):
    cur.execute("DELETE FROM Sales WHERE id = ?", (sale_id,))
    conn.commit()


"""SALESIEMS TABLE"""

# C: Function to add products to a sale
def create_sale_item(sale_id, product_id, quantity, price):
    cur.execute("INSERT INTO SalesItems (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", 
                (sale_id, product_id, quantity, price))
    conn.commit()

# R: Function to read products in a sale
def read_products_in_sale(sale_id):
    cur.execute('''
    SELECT SalesItems.id, Products.description, SalesItems.quantity, SalesItems.price
    FROM SalesItems
    JOIN Products ON SalesItems.product_id = Products.id
    WHERE SalesItems.sale_id = ?
    ''', (sale_id,))
    return cur.fetchall()

# U: Function to update a product in a sale
def update_sale_item(sale_item_id, quantity, price):
    cur.execute("UPDATE SalesItems SET quantity = ?, price = ? WHERE id = ?", 
                (quantity, price, sale_item_id))
    conn.commit()

# D: Function to delete a product from a sale
def delete_sale_item(sale_item_id):
    cur.execute("DELETE FROM SalesItems WHERE id = ?", (sale_item_id,))
    conn.commit()

conn.close()
