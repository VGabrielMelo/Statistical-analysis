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
                Route('/get-csv', Controllers.Dataset.Dataset.getcsv, methods=["POST"]),
                Route('/get-exel', Controllers.Dataset.Dataset.getexel, methods=["POST"]),
                Route('/up-dataset', Controllers.Dataset.Dataset.up_dataset, methods=["POST"]),
                Route('/manipulate-dataframe', Controllers.Dataset.Dataset.manipulatedataset, methods=["GET"]),
                Route('/add-user', Controllers.User.User.add_user, methods=["POST"]),
               ]
