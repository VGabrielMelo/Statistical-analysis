from starlette.routing import Route
from actions.Olá import OláActions
methods=["GET", "POST"]
class Router:
    @staticmethod
    def get_routes():
        return [Route('/hello', OláActions.hello, methods=["POST"]),]