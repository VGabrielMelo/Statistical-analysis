import api from './../../services/api'

async function uploadArquivo(arquivo){
    let data = {
        "dataset":arquivo
    }
    await api.post("/up-csv",data).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}

export default uploadArquivo;