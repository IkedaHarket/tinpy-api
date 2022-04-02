const { Router } = require('express');
const { check } = require('express-validator');
const { crearNegocio, getAllNegocios } = require('../controllers/negocio');
const { fileUpload } = require('../middlewares/fileUpload');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { verifyTipoNegocioById } = require('../helpers/verifyTipoNegocio');

const router =  new Router();

router.get('/all',getAllNegocios);

router.post("/",[
    validarJWT,
    fileUpload,
    check('tipoNegocio','El tipo de negocio no es un mongoID valido').isMongoId(),
    check('tipoNegocio').custom(verifyTipoNegocioById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],crearNegocio)


module.exports = router;