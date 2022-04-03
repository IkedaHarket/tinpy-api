const {Router} = require('express');
const { check,param } = require('express-validator');
const { crearEnlace, modEnlace, getAllRedes, getRedesPaginate, getRedById, deleteRed, getAllRedesByIdNegocio, getRedesByIdNegocioPaginate } = require('../controllers/redes');
const { verifyNegocioById } = require('../helpers/verifyNegocio');
const { verifyRedById } = require('../helpers/verifyRedes');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();

router.get('/all',getAllRedes);

router.get('/paginate',getRedesPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyRedById),
    validarCampos
],getRedById)

router.get('/negocio-redes-all/:idNegocio',[
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    validarCampos
],getAllRedesByIdNegocio)

router.get('/negocio-redes-paginate/:idNegocio',[
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    validarCampos
],getRedesByIdNegocioPaginate)

router.post('/',[
    validarJWT,
    check('nombre','El nombre del enlace es obligatorio').not().isEmpty(),
    check('enlace','El enlace es obligatorio').not().isEmpty(),
    validarCampos
],crearEnlace)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyRedById),
    check('nombre','El nombre del enlace es obligatorio').not().isEmpty(),
    check('enlace','El enlace es obligatorio').not().isEmpty(),
    validarCampos
],modEnlace)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyRedById),
    validarCampos
],deleteRed)

module.exports = router;