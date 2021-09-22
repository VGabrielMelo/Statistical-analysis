from starlette.responses import JSONResponse
from starlette.requests import Request
from Controllers.Database import user
from Controllers.Database import database

# Verificar esse arquivo e pensar em uma forma de conseguir database
class User:

    @staticmethod
    async def list_user(request: Request):
        await database.connect()
        query = user.select()
        results = await database.fetch_all(query)
        content = [
            {
                "nome": result["nome"],
                "email": result["email"],
                "perfil": result["perfil"],
            }
            for result in results
        ]
        await database.disconnect()
        return JSONResponse(content)

    @staticmethod
    async def add_user(request: Request):
        data = await request.json()

        query = user.insert().values(
        nome=data["nome"],
        email=data["email"],
        senha=data["senha"],
        perfil=data["perfil"]
        )
        await database.connect()
        await database.execute(query)
        await database.disconnect()
        return JSONResponse({
            "nome": data["nome"],
            "email": data["email"],
            "senha": data["senha"],
            "perfil": data["perfil"]
        })