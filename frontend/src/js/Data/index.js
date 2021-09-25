import api from './../../services/api'
    export default async function getData(nome_arquivo){
        return await api.get(`/files/${nome_arquivo}`)
            .then((res)=>{
                console.log("--------axios--------")
                console.log(res)
                return res
            }).catch((err)=>{
                return err.response
            }) 
}
