
const {Router} = require('express');
const { check, param } = require('express-validator');

const { addStarsByIdNegocio } = require('../controllers/stars');
const { verifyNegocioById } = require('../helpers/verifyNegocio');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();

router.post('/:idNegocio',[
    validarJWT,
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    check('stars','El numero de estrellas es obligatorio').not().isEmpty(),
    check('stars','Las estrellas deben ser un numero').isNumeric(),
    check('stars','El numero de estrellas deben ser entre 0 y 5').isFloat({min:0, max:5}),
    validarCampos,
],addStarsByIdNegocio);

module.exports = router;