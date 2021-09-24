const { ArquivoModel } = require("./../models")
const csv = require('jquery-csv');
const fs = require('fs');
const sturges = require("./../js/sturges")
const amplitudeTotal = require("./../js/amplitudeTotal")
const classes = require("./../js/classes")



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

    async getFile(req,res){
        let filename = req.params.nome;
        let arquivo_convertido = []
        fs.readFile('assets/'+filename, 'UTF-8', function (err, fileContent) {
            if (err) { console.log(err); }
            csv.toArrays(fileContent, {}, function (err, data) {
                if (err) { console.log(err); }
                    for (let i = 0, len = data.length; i < len; i++) {
                        arquivo_convertido.push(parseFloat(data[i][0]))      
                }
                arquivo_convertido.sort(function(a, b){return a - b})
                if(!(arquivo_convertido[0] instanceof Number) ){
                    arquivo_convertido.shift()
                }
                let numero_classes = sturges(arquivo_convertido)
                let amplitude_total = amplitudeTotal(arquivo_convertido[arquivo_convertido.length - 1],arquivo_convertido[0])
                let intervalo_classes = parseFloat((amplitude_total/numero_classes).toFixed(2))            
                let classes_numericas = classes(arquivo_convertido,intervalo_classes)
                classes_numericas.forEach((classe,index)=>{
                    arquivo_convertido.forEach((d,k)=>{
                        if(d>=classe[0]&&d<classe[1]){
                            classe[2]++
                        }
                    })
                    let frequencia_relativa = (classe[2]/arquivo_convertido.length)*100
                    frequencia_relativa = parseFloat(frequencia_relativa.toFixed(2))
                    classe.push(frequencia_relativa)
                }) 
                let response = {
                    numero_classes:numero_classes,
                    amplitude_total:amplitude_total,
                    intervalo_classes:intervalo_classes,
                    classes:classes_numericas
                }
                return res.status(200).json(response)

            })
        })
    }

    
}

module.exports = ArquivoController;