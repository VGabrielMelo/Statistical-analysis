const { ArquivoModel } = require("./../models")

class ArquivoController {
    async createFile (req,res) {
        let nome
        const file = req.file
        if (!file) {
            res.status(400).json({error:["Faça o upload de um arquivo."]})
        }
        else{
            nome=file.originalname
        }
            let existente = await ArquivoModel.findOne({where: {nome}})
            if(!existente){
                return await ArquivoModel
                    .create({ nome })
                    .then( async (r) => {
                        res.status(200).json({msg:"Arquivo recebido com sucesso."})
                    }).catch((err) => {
                        try {
                            return res.status(400).json({
                                error: err.message,
                                type: "validation"
                            })
                        } catch (error) {
                            return res.status(400).json({ error: [error.message]})
                        }
                    })  
            }else{
                return res.status(400).json({error:["Arquivo ja cadastrado."]})   
            }
                

    }

    async listFiles (req,res) {

        return await ArquivoModel
            .findAll()
            .then( async (r) => {
                return res.status(200).json(r)
            }).catch((err) => {
                try {
                    return res.status(400).json({
                        error: err.message,
                        type: "validation"
                    })
                } catch (error) {
                    return res.status(400).json({ error: [error.message]})
                }  
            })
    }
}

module.exports = ArquivoController;