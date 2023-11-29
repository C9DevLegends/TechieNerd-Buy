from flask import Flask, g, request, flash, render_template, redirect, url_for, session
import sqlite3
import contextlib
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from model import app, get_db, create_user_table, create_products_table, create_categories_table, create_orders_table, create_carts_table, create_reviews_table, create_addresses_table, create_payments_table, create_sessions_table
import validator

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['DATABASE'] = 'site.db'

login_manager = LoginManager(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    user = get_user_by_id(user_id)
    if user:
        user_object = User()
        user_object.id = user[0]
        return user_object
    return None


@contextlib.contextmanager
def get_db():
    conn = sqlite3.connect(app.config['DATABASE'])
    try:
        yield conn
    finally:
        conn.close()


def get_user_by_id(user_id):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
            SELECT * FROM users WHERE id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            user = cursor.fetchone()

            return user

    except sqlite3.Error as e:
        flash(f'Error fetching user details: {e}', 'error')
        return None


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        name = request.form['name']
        password1 = request.form['password']
        password2 = request.form['confirm_password']

        validation_error = validator.validate_registration(username, email, name, password1, password2)
        if validation_error:
            flash(validation_error, 'error')
        else:
            try:
                with get_db() as conn:
                    cursor = conn.cursor()

                    hashed_password = validator.hash_password(password1)

                    insert_query = '''
                    INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?);
                    '''

                    cursor.execute(insert_query, (username, name, email, hashed_password))
                    conn.commit()

                    flash('Registration successful! Please log in.', 'success')
                    return redirect(url_for('login'))
            except sqlite3.Error as e:
                flash(f'Error registering user: {e}', 'error')

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        try:
            with get_db() as conn:
                cursor = conn.cursor()

                select_query = '''
                SELECT * FROM users WHERE username = ?;
                '''

                cursor.execute(select_query, (username,))
                user = cursor.fetchone()

                if user and validator.check_password(user[4], password):  # Assuming hashed password is in the fifth column
                    user_object = User()
                    user_object.id = user[0]
                    login_user(user_object)
                    flash('Login successful!', 'success')
                    return redirect(url_for('dashboard'))
                else:
                    flash('Invalid username or password. Please try again.', 'error')

        except sqlite3.Error as e:
            flash(f'Error during login: {e}', 'error')

    return render_template('login.html')


@app.route('/dashboard')
@login_required
def dashboard():
    user_id = current_user.id

    # Fetch user details from the database
    user = get_user_by_id(user_id)

    if user:
        # Fetch recent activity
        recent_orders = get_recent_orders(user_id)
        recent_views = get_recent_product_views(user_id)
        recent_posts = get_recent_forum_posts(user_id)

        # Fetch personalized recommendations based on purchase history and browsing behavior
        recommendations = get_personalized_recommendations(user_id)

        # Fetch user statistics
        user_statistics = get_user_statistics(user_id)

        # Render the dashboard template with the retrieved information
        return render_template('dashboard.html', user=user, recent_orders=recent_orders,
                               recent_views=recent_views, recent_posts=recent_posts,
                               recommendations=recommendations, user_statistics=user_statistics)
    else:
        flash('User not found. Please log in again.', 'error')
        return redirect(url_for('login'))


def get_recent_orders(user_id):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
            SELECT * FROM orders
            WHERE user_id = ?
            ORDER BY order_date DESC
            LIMIT 5;
            '''

            cursor.execute(select_query, (user_id,))
            recent_orders = cursor.fetchall()

            return recent_orders

    except sqlite3.Error as e:
        flash(f'Error fetching recent orders: {e}', 'error')
        return None


def get_recent_product_views(user_id):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
            SELECT product_name FROM product_views
            WHERE user_id = ?
            ORDER BY view_date DESC
            LIMIT 5;
            '''

            cursor.execute(select_query, (user_id,))
            recent_product_views = [row[0] for row in cursor.fetchall()]

            return recent_product_views

    except sqlite3.Error as e:
        flash(f'Error fetching recent product views: {e}', 'error')
        return None


def get_recent_forum_posts(user_id):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
            SELECT post_content FROM forum_posts
            WHERE user_id = ?
            ORDER BY post_date DESC
            LIMIT 5;
            '''

            cursor.execute(select_query, (user_id,))
            recent_forum_posts = [row[0] for row in cursor.fetchall()]

            return recent_forum_posts

    except sqlite3.Error as e:
        flash(f'Error fetching recent forum posts: {e}', 'error')
        return None


def get_personalized_recommendations(user_id):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            # Placeholder logic: Recommend products based on the user's most purchased category
            select_query = '''
            SELECT p.product_name
            FROM orders o
            JOIN products p ON o.category_id = p.category_id
            WHERE o.user_id = ?
            ORDER BY o.order_date DESC
            LIMIT 5;
            '''

            cursor.execute(select_query, (user_id,))
            personalized_recommendations = [row[0] for row in cursor.fetchall()]

            return personalized_recommendations

    except sqlite3.Error as e:
        flash(f'Error generating personalized recommendations: {e}', 'error')
        return None


def get_user_statistics(user_id):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            # Calculate total spending
            total_spending_query = '''
            SELECT SUM(total_price) FROM orders
            WHERE user_id = ?;
            '''

            cursor.execute(total_spending_query, (user_id,))
            total_spending = cursor.fetchone()[0] or 0

            # Calculate total number of orders
            total_orders_query = '''
            SELECT COUNT(*) FROM orders
            WHERE user_id = ?;
            '''

            cursor.execute(total_orders_query, (user_id,))
            total_orders = cursor.fetchone()[0] or 0

            # Create a dictionary with user statistics
            user_statistics = {
                'total_spending': total_spending,
                'total_orders': total_orders,
            }

            return user_statistics

    except sqlite3.Error as e:
        flash(f'Error calculating user statistics: {e}', 'error')
        return None


@app.route('/products')
def view_products():
    # Get filter, sort, and search parameters from the request
    category_filter = request.args.get('category')
    price_range_filter = request.args.get('price_range')
    sort_by = request.args.get('sort_by')
    search_query = request.args.get('search_query')

    # Fetch filtered and sorted products
    products = get_all_products(category_filter, price_range_filter, sort_by, search_query)

    return render_template('products.html', products=products)


def get_all_products(category_filter=None, price_range_filter=None, sort_by=None, search_query=None, page=1, per_page=10):
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            # Base query
            select_query = '''
            SELECT * FROM products
            '''

            # Apply filters
            filters = []
            if category_filter:
                filters.append(f"category = '{category_filter}'")
            if price_range_filter:
                filters.append(f"price {price_range_filter}")

            if filters:
                select_query += ' WHERE ' + ' AND '.join(filters)

            # Apply search
            if search_query:
                select_query += f" AND (product_name LIKE '%{search_query}%' OR description LIKE '%{search_query}%')"

            # Apply sorting
            if sort_by:
                select_query += f" ORDER BY {sort_by}"

            # Add pagination
            offset = (page - 1) * per_page
            select_query += f" LIMIT {per_page} OFFSET {offset}"

            cursor.execute(select_query)
            products = cursor.fetchall()

            return products

    except sqlite3.Error as e:
        flash(f'Error fetching products: {e}', 'error')
        return None


# Create a new order
@app.route('/create_order', methods=['POST'])
@login_required
def create_order():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            total_price = request.form['total_price']
            status = request.form['status']

            insert_query = '''
                INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?);
            '''

            cursor.execute(insert_query, (user_id, total_price, status))
            conn.commit()

            return jsonify({'message': 'Order created successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error creating order: {e}'}), 500


# Get all orders for a user
@app.route('/get_user_orders')
@login_required
def get_user_orders():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM orders WHERE user_id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            orders = cursor.fetchall()

            return jsonify({'orders': orders})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching user orders: {e}'}), 500


# Create a new category
@app.route('/create_category', methods=['POST'])
@login_required
def create_category():
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            name = request.form['name']

            insert_query = '''
                INSERT INTO categories (name) VALUES (?);
            '''

            cursor.execute(insert_query, (name,))
            conn.commit()

            return jsonify({'message': 'Category created successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error creating category: {e}'}), 500


# Get all categories
@app.route('/get_categories')
def get_categories():
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM categories;
            '''

            cursor.execute(select_query)
            categories = cursor.fetchall()

            return jsonify({'categories': categories})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching categories: {e}'}), 500


# Create a new cart entry
@app.route('/add_to_cart', methods=['POST'])
@login_required
def add_to_cart():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            product_id = request.form['product_id']
            quantity = request.form['quantity']

            insert_query = '''
                INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?);
            '''

            cursor.execute(insert_query, (user_id, product_id, quantity))
            conn.commit()

            return jsonify({'message': 'Product added to cart successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error adding to cart: {e}'}), 500


# Get user's cart
@app.route('/get_user_cart')
@login_required
def get_user_cart():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM carts WHERE user_id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            user_cart = cursor.fetchall()

            return jsonify({'user_cart': user_cart})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching user cart: {e}'}), 500

# Create a new review
@app.route('/add_review', methods=['POST'])
@login_required
def add_review():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            product_id = request.form['product_id']
            rating = request.form['rating']
            review_text = request.form['review_text']

            insert_query = '''
                INSERT INTO reviews (user_id, product_id, rating, review_text) VALUES (?, ?, ?, ?);
            '''

            cursor.execute(insert_query, (user_id, product_id, rating, review_text))
            conn.commit()

            return jsonify({'message': 'Review added successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error adding review: {e}'}), 500


# Get user's reviews
@app.route('/get_user_reviews')
@login_required
def get_user_reviews():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM reviews WHERE user_id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            user_reviews = cursor.fetchall()

            return jsonify({'user_reviews': user_reviews})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching user reviews: {e}'}), 500


# Create a new address
@app.route('/add_address', methods=['POST'])
@login_required
def add_address():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            address_line1 = request.form['address_line1']
            address_line2 = request.form.get('address_line2', None)
            city = request.form['city']
            state = request.form['state']
            zip_code = request.form['zip_code']
            country = request.form['country']

            insert_query = '''
                INSERT INTO addresses (user_id, address_line1, address_line2, city, state, zip_code, country)
                VALUES (?, ?, ?, ?, ?, ?, ?);
            '''

            cursor.execute(insert_query, (user_id, address_line1, address_line2, city, state, zip_code, country))
            conn.commit()

            return jsonify({'message': 'Address added successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error adding address: {e}'}), 500


# Get user's addresses
@app.route('/get_user_addresses')
@login_required
def get_user_addresses():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM addresses WHERE user_id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            user_addresses = cursor.fetchall()

            return jsonify({'user_addresses': user_addresses})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching user addresses: {e}'}), 500


# Create a new payment
@app.route('/add_payment', methods=['POST'])
@login_required
def add_payment():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            order_id = request.form['order_id']
            payment_method = request.form['payment_method']
            transaction_id = request.form['transaction_id']
            payment_status = request.form['payment_status']

            insert_query = '''
                INSERT INTO payments (user_id, order_id, payment_method, transaction_id, payment_status)
                VALUES (?, ?, ?, ?, ?);
            '''

            cursor.execute(insert_query, (user_id, order_id, payment_method, transaction_id, payment_status))
            conn.commit()

            return jsonify({'message': 'Payment added successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error adding payment: {e}'}), 500


# Get user's payments
@app.route('/get_user_payments')
@login_required
def get_user_payments():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM payments WHERE user_id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            user_payments = cursor.fetchall()

            return jsonify({'user_payments': user_payments})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching user payments: {e}'}), 500


# Create a new session
@app.route('/add_session', methods=['POST'])
@login_required
def add_session():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            session_token = request.form['session_token']
            expiration_date = request.form['expiration_date']

            insert_query = '''
                INSERT INTO sessions (user_id, session_token, expiration_date)
                VALUES (?, ?, ?);
            '''

            cursor.execute(insert_query, (user_id, session_token, expiration_date))
            conn.commit()

            return jsonify({'message': 'Session added successfully'})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error adding session: {e}'}), 500


# Get user's sessions
@app.route('/get_user_sessions')
@login_required
def get_user_sessions():
    user_id = current_user.id
    try:
        with get_db() as conn:
            cursor = conn.cursor()

            select_query = '''
                SELECT * FROM sessions WHERE user_id = ?;
            '''

            cursor.execute(select_query, (user_id,))
            user_sessions = cursor.fetchall()

            return jsonify({'user_sessions': user_sessions})
    except sqlite3.Error as e:
        return jsonify({'error': f'Error fetching user sessions: {e}'}), 500


if __name__ == '__main__':
    try:
        create_user_table()
        create_products_table()
        create_categories_table()
        create_orders_table()
        create_carts_table()
        create_reviews_table()
        create_addresses_table()
        create_payments_table()
        create_sessions_table()
        app.run(debug=True)
    except Exception as e:
        print("An error occurred:", e)
