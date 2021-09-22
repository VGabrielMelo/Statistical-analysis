from starlette.applications import Starlette
from router import Router

from Controllers.Database import retornar_database

app = Starlette(debug=True, routes=Router.get_routes(), on_startup= retornar_database.connect,
    on_shutdown=retornar_database.disconnect)
