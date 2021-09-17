class OláService:
    def __init__(self, p_nome: str):
        self.__nome = p_nome

    def Hello(self) -> str:
        return "Olá " + self.__nome + "Você criou seu micro-serviço"
