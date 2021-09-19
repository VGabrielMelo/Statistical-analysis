from starlette.routing import Route
from actions.Olá import OláActions
from actions.GetDataset import GetDatasetActions
class Router:
    @staticmethod
    def get_routes():
        return [Route('/hello', OláActions.hello, methods=["POST"]),
                Route('/getdataframe', GetDatasetActions.getdataset, methods=["POST"]),
        ]
