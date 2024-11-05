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

# R: Function to read users with optional filtering
def read_users(name=None, email=None, user_type=None):
    query = "SELECT * FROM Users WHERE 1=1"  # Start with a basic query
    params = []

    if name is not None:
        query += " AND name = ?"
        params.append(name)
    if email is not None:
        query += " AND email = ?"
        params.append(email)
    if user_type is not None:
        query += " AND user_type = ?"
        params.append(user_type)

    cur.execute(query, params)
    return cur.fetchall()

# U: Function to update a user
def update_user(user_id, name=None, email=None, password=None):
    query = "UPDATE Users SET "
    params = []

    if name is not None:
        query += "name = ?, "
        params.append(name)
    if email is not None:
        query += "email = ?, "
        params.append(email)
    if password is not None:
        query += "password = ?, "
        params.append(password)

    query = query.rstrip(", ") + " WHERE id = ?"
    params.append(user_id)

    cur.execute(query, params)
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

# R: Function to read products with optional filtering
def read_products(description=None, quantity=None, price=None):
    query = "SELECT * FROM Products WHERE 1=1"  # Start with a basic query
    params = []

    if description is not None:
        query += " AND description = ?"
        params.append(description)
    if quantity is not None:
        query += " AND quantity = ?"
        params.append(quantity)
    if price is not None:
        query += " AND price = ?"
        params.append(price)

    cur.execute(query, params)
    return cur.fetchall()

# U: Function to update a product
def update_product(product_id, description=None, quantity=None, price=None):
    query = "UPDATE Products SET "
    params = []

    if description is not None:
        query += "description = ?, "
        params.append(description)
    if quantity is not None:
        query += "quantity = ?, "
        params.append(quantity)
    if price is not None:
        query += "price = ?, "
        params.append(price)

    query = query.rstrip(", ") + " WHERE id = ?"
    params.append(product_id)

    cur.execute(query, params)
    conn.commit()

# D: Function to delete a product
def delete_product(product_id):
    cur.execute("DELETE FROM Products WHERE id = ?", (product_id,))
    conn.commit()


"""SALES TABLE"""

# C: Function to insert a sale
def create_sale(seller_id, total_value, payment_method, installment, number_of_installments=None, 
                installment_value=None, discount=0):
    cur.execute("""
        INSERT INTO Sales (seller_id, sale_date, total_value, payment_method, installment, 
                           number_of_installments, installment_value, discount) 
        VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?)
    """, (seller_id, total_value, payment_method, installment, number_of_installments, 
          installment_value, discount))
    conn.commit()

# R: Function to read sales with optional filtering
def read_sales(seller_id=None, sale_date=None, total_value=None, payment_method=None, 
               installment=None, number_of_installments=None, discount=None):
    query = "SELECT * FROM Sales WHERE 1=1"  # Start with a basic query
    params = []

    if seller_id is not None:
        query += " AND seller_id = ?"
        params.append(seller_id)
    if sale_date is not None:
        query += " AND sale_date = ?"
        params.append(sale_date)
    if total_value is not None:
        query += " AND total_value = ?"
        params.append(total_value)
    if payment_method is not None:
        query += " AND payment_method = ?"
        params.append(payment_method)
    if installment is not None:
        query += " AND installment = ?"
        params.append(installment)
    if number_of_installments is not None:
        query += " AND number_of_installments = ?"
        params.append(number_of_installments)
    if discount is not None:
        query += " AND discount = ?"
        params.append(discount)

    cur.execute(query, params)
    return cur.fetchall()

# U: Function to update a sale
def update_sale(sale_id, seller_id=None, sale_date=None, total_value=None, 
                payment_method=None, installment=None, number_of_installments=None, 
                installment_value=None, discount=None):
    query = "UPDATE Sales SET "
    params = []

    if seller_id is not None:
        query += "seller_id = ?, "
        params.append(seller_id)
    if sale_date is not None:
        query += "sale_date = ?, "
        params.append(sale_date)
    if total_value is not None:
        query += "total_value = ?, "
        params.append(total_value)
    if payment_method is not None:
        query += "payment_method = ?, "
        params.append(payment_method)
    if installment is not None:
        query += "installment = ?, "
        params.append(installment)
    if number_of_installments is not None:
        query += "number_of_installments = ?, "
        params.append(number_of_installments)
    if installment_value is not None:
        query += "installment_value = ?, "
        params.append(installment_value)
    if discount is not None:
        query += "discount = ?, "
        params.append(discount)

    query = query.rstrip(", ") + " WHERE id = ?"
    params.append(sale_id)

    cur.execute(query, params)
    conn.commit()

# D: Function to delete a sale
def delete_sale(sale_id):
    cur.execute("DELETE FROM Sales WHERE id = ?", (sale_id,))
    conn.commit()


"""SALESITEMS TABLE"""

# C: Function to add products to a sale
def create_sale_item(sale_id, product_id, quantity, price):
    cur.execute("INSERT INTO SalesItems (sale_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", 
                (sale_id, product_id, quantity, price))
    conn.commit()

# R: Function to read products in one or multiple sales with optional filtering
def read_products_in_sale(sale_ids, product_id=None, quantity=None, price=None):
    query = '''
    SELECT SalesItems.id, Products.description, SalesItems.quantity, SalesItems.price
    FROM SalesItems
    JOIN Products ON SalesItems.product_id = Products.id
    WHERE SalesItems.sale_id IN ({})  -- Placeholder for sale IDs
    '''.format(','.join('?' for _ in sale_ids))  # Generate placeholders for sale_ids
    params = list(sale_ids)

    if product_id is not None:
        query += " AND SalesItems.product_id = ?"
        params.append(product_id)
    if quantity is not None:
        query += " AND SalesItems.quantity = ?"
        params.append(quantity)
    if price is not None:
        query += " AND SalesItems.price = ?"
        params.append(price)

    cur.execute(query, params)
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
