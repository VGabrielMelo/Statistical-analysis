import api from './../../services/api'
import getFileExtension from './../../utils/getFileExtension'


/* async function uploadArquivo(arquivo){
    let extensao = getFileExtension(arquivo)
    let rota
    if(extensao==="csv"){
        rota="/up-csv"
    }else{
        rota="/up-exel"
    }
    let caminho = arquivo.split(".")
    caminho.pop()
    caminho = caminho.toString()
    let data = {
        "dataset":caminho
    }
    console.log(data)
    await api.post(rota,data).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    }) */

     async function uploadArquivo(arquivo){
        console.log(arquivo instanceof File)
        const formData = new FormData()
        formData.append('arquivo', arquivo)
        await api.post("/upload",formData).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        }) 
}

export default uploadArquivo;