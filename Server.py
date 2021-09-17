from starlette.applications import Starlette
from router import Router
app = Starlette(debug=True, routes=Router.get_routes())