import api from '../../utils/api'
    export default async function getData(nome_arquivo){
        return await api.get(`/files/${nome_arquivo}`)
            .then((res)=>{
                return res
            }).catch((err)=>{
                return err.response
            }) 
}
