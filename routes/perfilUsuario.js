
const { Router } = require('express');

const { fileUpload } = require('../middlewares/fileUpload');
const { crearPerfil } = require('../controllers/perfilUsuario');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');


const router = new Router();

router.post('/',[
    validarJWT,
    fileUpload,
    validarCampos
],crearPerfil);

module.exports = router;