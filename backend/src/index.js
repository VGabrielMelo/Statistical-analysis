const express = require("express")
const app = express()
const multer = require("multer")
require("dotenv").config();
const PORT = process.env.PORT || 8080
const cors = require('cors');
const { ArquivoController } = require('./../controllers/index')
const { createFile,listFiles } = new ArquivoController();
const csv = require('jquery-csv');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null,'assets')
    },
    filename: (req, file, callback) =>{
        callback(null,file.originalname)
    }
})
const upload = multer({storage})

app.use(express.json({ extented: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.post("/upload",upload.single("arquivo"),createFile)

app.get('/files', listFiles)

app.get('/files/:nome', (req, res) => {
    let filename = req.params.nome;
    let arquivo_convertido = []
    fs.readFile('./assets/'+filename, 'UTF-8', function (err, fileContent) {
        if (err) { console.log(err); }
        csv.toArrays(fileContent, {}, function (err, data) {
            if (err) { console.log(err); }
                for (let i = 0, len = data.length; i < len; i++) {
                    console.log(data[i][0])
                    arquivo_convertido.push(parseFloat(data[i][0]))
                    
            }
            arquivo_convertido.sort(function(a, b){return a - b})
            return res.status(200).json(arquivo_convertido)

        });
    })

    
    })
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}...`)
})