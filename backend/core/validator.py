import re
from werkzeug.security import generate_password_hash, check_password_hash

def validate_registration(username, email, name, password1, password2):
    if not (username and email and name and password1 and password2):
        return 'All fields are required'

    if len(username) > 20:
        return 'Username should be less than 20 characters'

    email_pattern = r'^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        return 'Please enter a valid email address'

    if len(name) > 50:
        return 'Name should be less than 50 characters'

    if password1 != password2:
        return 'Passwords do not match'

    return None # No errors

def hash_password(password):
    return generate_password_hash(password, method='sha256')

def check_password(hashed_password, password):
    return check_password_hash(hashed_password, password)
