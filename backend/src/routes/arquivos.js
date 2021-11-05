const router = require("express").Router();
const {ArquivoController} = require("../controllers");
const { authMiddleware } = require("../middlewares");
const {createFile, listFiles, getFile}  = new ArquivoController();

router.use(authMiddleware);

router.post("/upload",createFile)

router.get('/files', listFiles)

router.get('/files/:nome', getFile)

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida com o usuário']});
})

module.exports = router;