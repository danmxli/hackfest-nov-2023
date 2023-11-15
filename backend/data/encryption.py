from dotenv import load_dotenv
import os
from cryptography.fernet import Fernet

load_dotenv('../.env')
key = os.getenv("ENCRYPTION_KEY")

def encrypt_password(password):
    if key is not None:
        fernet = Fernet(key.encode())
        encrypted_password = fernet.encrypt(password.encode())
        # convert bytes to string
        return encrypted_password.decode('utf-8')
    else:
        ...

def decrypt_password(password):
    # convert string to bytes
    password = password.encode('utf-8')
    if key is not None:
        fernet = Fernet(key.encode())
        # return as decoded string 
        decrypted_password = fernet.decrypt(password.decode()).decode()
        return decrypted_password
    else:
        ...
