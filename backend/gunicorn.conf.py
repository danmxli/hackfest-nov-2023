import os
from multiprocessing import cpu_count

workers = (2 * cpu_count()) + 1

threads = int(os.environ.get('GUNICORN_THREADS', '4'))

timeout = int(os.environ.get('GUNICORN_TIMEOUT', '150'))

forwarded_allow_ips = '*'

secure_scheme_headers = {'X-Forwarded-Proto': 'https'}
