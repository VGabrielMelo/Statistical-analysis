const express = require("express")
const router = require("./routes");
const app = express()
const multer = require("multer")
require("dotenv").config();
const PORT = process.env.PORT || 8080
const cors = require('cors');

app.use('/EP', router);
app.use(express.json({ extented: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}...`)
})