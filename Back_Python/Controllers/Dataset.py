from starlette.responses import JSONResponse
from starlette.requests import Request
from json import JSONDecodeError
import pandas as pd
import math
import shutil
from starlette_dataframe_response import DataFrameResponse, guess_media_type


from Controllers.Database import dataset
from Controllers.Database import database

class Dataset:
    
    #Path arquivo dataset global
    Pathdataset = ''
    tipoarq = ''
    delimitador = ''
    #Retornando o csv cadastrado no banco
    @staticmethod
    async def getcsv(request: Request):
        try:
            global Pathdataset
            global tipoarq
            global delimitador
            data = await request.json()
            tipoarq = "csv"
            Pathdataset = data["pathcsv"]
            delimitador = data["delimitador"]
            df = pd.read_csv(Pathdataset, delimiter=delimitador,encoding="iso-8859-1")
            return DataFrameResponse(df, media_type=guess_media_type(request))
        except JSONDecodeError:
            return JSONResponse({'message': 'Ops... Não consegui encontrar esse Dataset... Tente novamente.'})

    #Retornando exel cadastrado no banco
    @staticmethod
    async def getexel(request: Request):
        try:
            global Pathdataset
            global tipoarq
            data = await request.json()
            tipoarq = "exel"
            Pathdataset = data["pathexel"]
            df = pd.read_excel(Pathdataset)
            return DataFrameResponse(df, media_type=guess_media_type(request))
        except JSONDecodeError:
            return JSONResponse({'message': 'Ops... Não consegui encontrar esse Dataset... Tente novamente.'})

    # Cadastrando o Path do csv no Banco
    @staticmethod
    async def up_dataset(request: Request):
        data = await request.json()
        #Copiar o arquivo para uma pasta utilizando o "shutil", para não pesar nosso BD
        source=data["pathdataset"]
        #Importante resaltar que aqui vai o *seu path* de pasta para os arquivos.
        destination=r'C:\Users\Victo\Desktop\Starlette_Estatística\dados_exemplo\csv'
        shutil.copy(source, destination)

        #Enivando nosso título e Path para o BD
        query = dataset.insert().values(
            titulo=data["titulo"],
            Path_dataset=data["pathdataset"]
        )
        await database.execute(query)
        return JSONResponse({
            "Message": "Título e Path do CSV cadastrado com sucesso!",
            "titulo": data["titulo"],
            "Path_dataset": data["Path_dataset"]
            })
            
    @staticmethod
    async def manipulatedataset(request: Request):
        try:
            global Pathdataset
            global tipoarq
            global delimitador
            #Validação de tipo de arquivo
            if tipoarq == 'csv':
                df = pd.read_csv(Pathdataset, delimiter=delimitador, encoding="iso-8859-1")
            else: 
                df = pd.read_excel(Pathdataset)
            #quantidade de valores dentro do dataset
            quant_data = df.size
            #Maior valor dentro do dataset
            data_max = df.max().max()
            #Menor valor dentro do dataset
            data_min = df.min().min()
            # Amplitude dos dados = Valor maior dos registros - menor valor
            at = df.max().max() - df.min().min()
            # Lembrando que k = raiz quadrada do total de registros/amostras
            k = math.sqrt(len(df))
            # O valor de amplitude de classe pode ser arredondado para um número inteiro, geralmente para facilitar a interpretação da tabela.
            h = at/k 
            #h = math.ceil(h)

            frequencias = []
            # Menor valor da série
            menor = round(data_min,1)
            # Menor valor somado a amplitude
            menor_amp = round(menor+h,1)
            valor = menor
            while valor < data_max:
                frequencias.append('{} - {}'.format(round(valor,1),round(valor+h,1)))
                valor += h

            #Transformando df em um array 1D
            nmpData= df.values.flatten()

            # Discretização dos valores em k faixas, rotuladas pela lista criada anteriormente
            freq_abs = pd.qcut(nmpData,len(frequencias),labels=frequencias)
            result_freq_abs = pd.value_counts(freq_abs)
            
            return JSONResponse({'Quantidade de valores dentro do dataset':str(quant_data),
                                 'Maior valor dentro do dataset':str(data_max),
                                 'Menor valor dentro do dataset':str(data_min),
                                 'Amplitude dos dados':str(at),
                                 'O valor de amplitude de classe arredondado':str(h),
                                 'Frequências':str(frequencias),
                                 'Distribuição das frequências':str(result_freq_abs),
                                })
        except JSONDecodeError:
            return JSONResponse({'message': 'Ops... Não consegui encontrar esse Dataset... Tente novamente.'})

    