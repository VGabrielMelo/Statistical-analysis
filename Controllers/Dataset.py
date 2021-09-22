from starlette.responses import JSONResponse
from starlette.requests import Request
from json import JSONDecodeError
import pandas as pd
from starlette_dataframe_response import DataFrameResponse, guess_media_type

class Dataset:

    @staticmethod
    async def getdataset(request: Request):
        try:
            body_payload = await request.json()
            dataset = body_payload.get('dataset',  None)
            delimitador = body_payload.get('delimitador',  None)
            df = pd.read_csv(dataset + ".csv", delimiter=delimitador,encoding="iso-8859-1")
            return DataFrameResponse(df, media_type=guess_media_type(request))
        except JSONDecodeError:
            return JSONResponse({'message': 'Ops... Não consegui encontrar esse Dataset... Tente novamente.'})
            
    @staticmethod
    async def manipulatedataset(request: Request):
        try:
            body_payload = await request.json()
            dataset = body_payload.get('dataset',  None)
            delimitador = body_payload.get('delimitador',  None)
            df = pd.read_csv(dataset + ".csv", delimiter=delimitador,encoding="iso-8859-1")
            return DataFrameResponse(df, media_type=guess_media_type(request))
        except JSONDecodeError:
            return JSONResponse({'message': 'Ops... Não consegui encontrar esse Dataset... Tente novamente.'})

    