from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

middleware = [
    Middleware(
    CORSMiddleware,
    allow_credentials = True, 
    allow_origins=['*'], 
    allow_methods=['*'], 
    allow_headers=['*']
    )
]