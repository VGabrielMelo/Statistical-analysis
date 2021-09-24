import api from './../../services/api'
    export default async function getFiles(){
        return await api.get("/files")
            .then((res)=>{
                console.log("--------axios--------")
                console.log(res)
                return res
            }).catch((err)=>{
                return err.response
            }) 
}
