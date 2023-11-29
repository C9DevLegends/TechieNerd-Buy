from flask import Flask, g
import sqlite3
import contextlib

app = Flask(__name__)
DATABASE = 'site.db'

app.secret_key = 'secret'

@contextlib.contextmanager
def get_db():
    conn = sqlite3.connect(DATABASE)
    try:
        yield conn
    finally:
        conn.close()

def create_table(table_name, table_definition):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            create_table_query = f'''
                CREATE TABLE IF NOT EXISTS {table_name} (
                    {table_definition}
                );
            '''

            cursor.execute(create_table_query)
            conn.commit()
    except sqlite3.Error as e:
        print(f"Error creating table {table_name}:", e)

def create_user_table():
    table_name = 'users'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    '''
    create_table(table_name, table_definition)

def create_products_table():
    table_name = 'products '
    table_definition = '''
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL,
        category_id INTEGER,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
    '''
    create_table(table_name, table_definition)

def create_orders_table():
    table_name = 'orders'
    table_definition = '''
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_price REAL NOT NULL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user (id)
    '''
    create_table(table_name, table_definition)

def create_categories_table():
    table_name = 'categories'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
    '''
    create_table(table_name, table_definition)

def create_carts_table():
    table_name = 'carts'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
    '''
    create_table(table_name, table_definition)

def create_reviews_table():
    table_name = 'reviews'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            rating INTEGER NOT NULL,
            review_text TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (product_id) REFERENCES products (id)
    '''
    create_table(table_name, table_definition)

def create_addresses_table():
    table_name = 'addresses'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            address_line1 TEXT NOT NULL,
            address_line2 TEXT,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip_code TEXT NOT NULL,
            country TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
    '''
    create_table(table_name, table_definition)

def create_payments_table():
    table_name = 'payments'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            order_id INTEGER NOT NULL,
            payment_method TEXT NOT NULL,
            transaction_id TEXT NOT NULL,
            payment_status TEXT NOT NULL,
            date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (order_id) REFERENCES orders (id)
    '''
    create_table(table_name, table_definition)

def create_sessions_table():
    table_name = 'sessions'
    table_definition = '''
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            session_token TEXT NOT NULL,
            expiration_date TIMESTAMP NOT NULL,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
    '''
    create_table(table_name, table_definition)

# def create_all_tables():
#     create_user_table()
#     create_products_table()
#     create_orders_table()
#     create_categories_table()
#     create_carts_table()
#     create_reviews_table()
#     create_addresses_table()
#     create_payments_table()
#     create_sessions_table()


