const router = require("express").Router();

const usuarioRoute = require("./usuario");
const arquivosRoute = require("./arquivos");

router.use("/usuario", usuarioRoute);
router.use("/arquivos", arquivosRoute);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida']});
})

module.exports = router;