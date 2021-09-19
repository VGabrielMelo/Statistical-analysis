from starlette.responses import JSONResponse
from starlette.requests import Request
from json import JSONDecodeError
import pandas as pd
from starlette_dataframe_response import DataFrameResponse, guess_media_type
from services.GetDataset import GetDatasetService

class GetDatasetActions:
    @staticmethod
    async def getdataset(request: Request):
        body_payload = await request.json()
        dataset = body_payload.get('dataset', None)
        df = pd.read_csv(dataset + ".csv", delimiter=";",encoding="iso-8859-1")
        return DataFrameResponse(df, media_type=guess_media_type(request))