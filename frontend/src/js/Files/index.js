import api from '../../utils/api'
    export default async function getFiles(){
        return await api.get("/arquivos/files")
            .then((res)=>{
                return res
            }).catch((err)=>{
                return err.response
            }) 
}
