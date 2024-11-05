1. To install SQLite
    - Linux: sudo apt-get install sqlite3
    - MAC: brew install sqlite3

2. To create all tables in database (this script drops all old tables and create new ones)
    - sqlite3 sales_app.db < create_tables.sql

3. CRUD operations for database
    - import crud.py or crud.js