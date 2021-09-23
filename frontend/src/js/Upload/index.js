import api from './../../services/api'
import getFileExtension from './../../utils/getFileExtension'
import $ from 'jquery'

async function uploadArquivo(arquivo,nome_arquivo){
    let extensao = getFileExtension(nome_arquivo)
    switch (extensao) {
        case 'csv':
            break;
        case 'xls':
            break;
        default:
            throw Error("Arquivo com formato inválido.")
    }
    await api.post("/up-csv")
    await api.post("/up-csv")
}

export default uploadArquivo;