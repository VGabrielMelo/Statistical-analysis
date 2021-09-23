from starlette.responses import JSONResponse
from starlette.requests import Request
from json import JSONDecodeError
import pandas as pd
import shutil
from starlette_dataframe_response import DataFrameResponse, guess_media_type


from Controllers.Database import csvs
from Controllers.Database import database

class Dataset:

    #Retornando o csv cadastrado no banco
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

    # Cadastrando o Path do csv no Banco
    @staticmethod
    async def up_csvs(request: Request):
        data = await request.json()
        #Copiar o arquivo para uma pasta utilizando o "shutil", para não pesar nosso BD
        source=data["Path_csv"]
        #Importante resaltar que aqui vai o *seu path* de pasta para os arquivos.
        destination=r'C:\Users\Victo\Desktop\Starlette_Estatística\dados_exemplo\csv'
        shutil.copy(source, destination)

        #Enivando nosso título e Path para o BD
        query = csvs.insert().values(
            titulo=data["titulo"],
            Path_csv=data["Path_csv"]
        )
        await database.execute(query)
        return JSONResponse({
            "Message": "Título e Path do CSV cadastrado com sucesso!",
            "titulo": data["titulo"],
            "Path_csv": data["Path_csv"]
            })
            
    # @staticmethod
    # async def manipulatedataset(request: Request):
    #     try:
    #         return DataFrameResponse()
    #     except JSONDecodeError:
    #         return JSONResponse({'message': 'Ops... Não consegui encontrar esse Dataset... Tente novamente.'})

    