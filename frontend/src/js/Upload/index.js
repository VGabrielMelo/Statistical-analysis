import api from './../../services/api'

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