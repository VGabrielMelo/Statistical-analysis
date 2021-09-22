from starlette.responses import JSONResponse
from Controllers.Database import retornar_database


# Verificar esse arquivo e pensar em uma forma de conseguir database
class User:

    @staticmethod
    async def list_notes(request):
        query = "select * from user"
        results = await retornar_database.fetch_all(query)
        content = [
            {
                "text": result["text"],
                "completed": result["completed"]
            }
            for result in results
        ]
        return JSONResponse(content)

    @staticmethod
    async def add_note(request):
        data = await request.json()
        query = "insert into user values(" + text=data["text"], completed=data["completed"]
    
        await retornar_database.execute(query)
        return JSONResponse({
            "text": data["text"],
            "completed": data["completed"]