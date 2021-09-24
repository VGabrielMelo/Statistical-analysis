const express = require("express")
const app = express()
const multer = require("multer")
require("dotenv").config();
const PORT = process.env.PORT || 8080
const cors = require('cors');
const { ArquivoController } = require('./controllers/index')
const { createFile, listFiles, getFile } = new ArquivoController();

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

app.get('/files/:nome', getFile)
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}...`)
})