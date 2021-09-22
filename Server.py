from starlette.applications import Starlette
from router import Router

from Controllers.Database import database

app = Starlette(routes=Router.get_routes(), on_startup=[database.connect],
    on_shutdown=[database.disconnect])


@app.on_event("startup")
async def startup() -> None:
    if not database.is_connected:
        await database.connect()


@app.on_event("shutdown")
async def shutdown() -> None:
    if database.is_connected:
        await database.disconnect()
