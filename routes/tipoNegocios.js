
const { Router } = require('express');
const { check,param } = require('express-validator');

const { getAllTipoNegocios, crearTipoNegocio, getTipoNegociosPaginate, getTipoNegocioById, modTipoNegocio, deleteTipoNegocio } = require('../controllers/tipoNegocio');
const { verifyTipoNegocioById } = require('../helpers/verifyTipoNegocio');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { validarAdmin } = require('../middlewares/verifyAdmin');

const router =  new Router();

router.get('/all',getAllTipoNegocios);

router.get('/paginate',getTipoNegociosPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyTipoNegocioById),
    validarCampos
],getTipoNegocioById)

router.post('/',[
    validarJWT,
    validarAdmin,
    check('nombre','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    validarCampos
],crearTipoNegocio)

router.put('/:id',[
    validarJWT,
    validarAdmin,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyTipoNegocioById),
    validarCampos
],modTipoNegocio)

router.delete('/:id',[
    validarJWT,
    validarAdmin,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyTipoNegocioById),
    validarCampos
],deleteTipoNegocio)


module.exports = router;