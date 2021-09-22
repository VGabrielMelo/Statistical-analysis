from starlette.applications import Starlette
from router import Router

from Controllers.Database import database

app = Starlette(routes=Router.get_routes(), on_startup=[database.connect],on_shutdown=[database.disconnect])

