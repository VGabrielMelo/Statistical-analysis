from starlette.applications import Starlette
from router import Router

from migrations.versions import create_dataset_table
from migrations.versions import create_user_table

from Controllers.Database import database

app = Starlette(routes=Router.get_routes(), on_startup=[database.connect],on_shutdown=[database.disconnect])


