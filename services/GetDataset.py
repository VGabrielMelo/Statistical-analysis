import pandas as pd
from starlette_dataframe_response import DataFrameResponse, guess_media_type
class GetDatasetService:
    def __init__(self, _nome_dataframe: str):
        self.__ndataframe = _nome_dataframe
    
    def get_nome_dataframe(self, dataframe:str):
        return dataframe