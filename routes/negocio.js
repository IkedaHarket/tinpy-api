const { Router } = require('express');
const { check, param } = require('express-validator');
const { crearNegocio, getAllNegocios, getNegociosPaginate, getNegocioById, getNegociosByNamePaginate, actualizarnegocio, getNegocioByIdUser } = require('../controllers/negocio');
const { fileUpload } = require('../middlewares/fileUpload');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { verifyTipoNegocioById } = require('../helpers/verifyTipoNegocio');
const { verifyNegocioById, verifyRouterNegocioByIdUser } = require('../helpers/verifyNegocio');

const router =  new Router();

router.get('/all',getAllNegocios);
router.get('/paginate',getNegociosPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyNegocioById),
    validarCampos
],getNegocioById)

router.get('/user/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyRouterNegocioByIdUser),
    validarCampos
],getNegocioByIdUser)

router.get('/name-paginate/:name',[
    param('name','El nombre no puede estar vacio').not().isEmpty(),
    validarCampos
],getNegociosByNamePaginate)

router.post("/",[
    validarJWT,
    fileUpload,
    check('tipoNegocio','El tipo de negocio no es un mongoID valido').isMongoId(),
    check('tipoNegocio').custom(verifyTipoNegocioById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],crearNegocio)

router.put("/",[
    validarJWT,
    fileUpload,
    check('tipoNegocio','El tipo de negocio no es un mongoID valido').isMongoId(),
    check('tipoNegocio').custom(verifyTipoNegocioById),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],actualizarnegocio)


module.exports = router;