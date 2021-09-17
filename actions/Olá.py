from starlette.responses import JSONResponse
from starlette.requests import Request
from json import JSONDecodeError

from services.Olá import OláService 

class OláActions:
    @staticmethod
    async def hello(request: Request) -> JSONResponse:
        try:
            body_payload = await request.json()
            nome = body_payload.get('nome', None)
            Olá_function = OláService(p_nome=nome)
            Result = Olá_function.Hello()
            return JSONResponse({'result': Result})
        except JSONDecodeError:
            return JSONResponse({'message': 'Body Payload, Error!'})