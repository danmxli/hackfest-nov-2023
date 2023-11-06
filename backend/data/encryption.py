from dotenv import load_dotenv
import os
from cryptography.fernet import Fernet

load_dotenv('../.env')

def encrypt_password(password):
    fernet = Fernet(os.getenv("ENCRYPTION_KEY").encode())
    encrypted_password = fernet.encrypt(password.encode())
    # convert bytes to string
    return encrypted_password.decode('utf-8')

def decrypt_password(password):
    # convert string to bytes
    password = password.encode('utf-8')
    fernet = Fernet(os.getenv("ENCRYPTION_KEY").encode())
    # return as decoded string 
    decrypted_password = fernet.decrypt(password.decode()).decode()
    return decrypted_password
