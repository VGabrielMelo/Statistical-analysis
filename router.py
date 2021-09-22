#Importando o roteamento do app. 
from starlette.routing import Route

#Importação dos arquivos de ação.

import Controllers.Dataset
import Controllers.User
import Controllers.Database


class Router:
    @staticmethod
    def get_routes():
        return [
                Route('/getdataframe', Controllers.Dataset.Dataset.getdataset, methods=["POST"]),
                Route('/manipulatedataframe', Controllers.Dataset.Dataset.manipulatedataset, methods=["GET"]),
               ]
