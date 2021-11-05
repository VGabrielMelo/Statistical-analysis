const { ArquivoModel } = require("./../models")
const csv = require('jquery-csv');
const multer = require("multer")
const fs = require('fs');
const sturges = require("./../js/sturges")
const amplitudeTotal = require("./../js/amplitudeTotal")
const classes = require("./../js/classes")

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null,'assets')
    },
    filename: (req, file, callback) =>{
        callback(null,file.originalname)
    }
})
const upload = multer({storage})



class ArquivoController {
    
    async createFile (req,res) {
        let nome
        const file = req.file
        if (!file) {
            res.status(400).json({error:["Faça o upload de um arquivo."]})
        }
        else{
            nome=file.originalname
            upload.single("arquivo")
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
                let numero_elementos = arquivo_convertido.length
                let numero_classes = sturges(arquivo_convertido)
                let amplitude_total = amplitudeTotal(arquivo_convertido[numero_elementos - 1],arquivo_convertido[0])
                let intervalo_classes = parseFloat((amplitude_total/numero_classes).toFixed(2))            
                let classes_numericas = classes(arquivo_convertido,intervalo_classes)
                classes_numericas.forEach((classe,index)=>{
                    arquivo_convertido.forEach((d,k)=>{
                        if(d>=classe[0]&&d<classe[1]){
                            classe[2][0]++
                        }
                    })
                    let frequencia_relativa = (classe[2][0]/numero_elementos)*100
                    frequencia_relativa = parseFloat(frequencia_relativa.toFixed(2))
                    classe[3][0]=frequencia_relativa
                    if(index!==0){
                        classe[2][1] = classes_numericas[index-1][2][1]+classe[2][0]
                        classe[3][1] = classes_numericas[index-1][3][1]+frequencia_relativa
                    }else{
                        classe[2][1] = classe[2][0]
                        classe[3][1] = frequencia_relativa
                    }
                }) 
                let mediana
                let index_mediana = parseInt(((numero_elementos/2)-1).toFixed(0))
                if(numero_elementos%2!==0){
                    mediana = arquivo_convertido[index_mediana]
                }
                else{
                    mediana = (arquivo_convertido[index_mediana]+arquivo_convertido[index_mediana+1])/2
                }
                mediana = parseFloat(mediana.toFixed(2))

               /*  let cont = [];
                let total = 1;
                for (let i = 0; i < numero_elementos; i++) {
                    if (i < numero_elementos - 1 && cores[i].cor == cores[i + 1].cor) {
                        total++;
                    } else {
                        cont.push({ cor: cores[i].cor, total: total });
                        total = 1;
                    }
                } */
                let response = {
                    numero_classes:numero_classes,
                    mediana:mediana,
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