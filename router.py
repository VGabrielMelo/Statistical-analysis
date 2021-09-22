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
                Route('/get-dataframe', Controllers.Dataset.Dataset.getdataset, methods=["POST"]),
                Route('/up-csv', Controllers.Dataset.Dataset.up_csvs, methods=["POST"]),
                Route('/manipulate-dataframe', Controllers.Dataset.Dataset.manipulatedataset, methods=["GET"]),
                Route('/add-user', Controllers.User.User.add_user, methods=["POST"]),
               ]
