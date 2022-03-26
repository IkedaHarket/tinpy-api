const { Router } = require('express');
const { check,param } = require('express-validator');

const { getAllDirecciones, getDireccionesPaginate, getDireccionById, crearDireccion, modDireccion, deleteDireccion } = require('../controllers/direcciones');
const { verifyDireccionById } = require('../helpers/verifyDirecciones');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();

//
    //TODO : Hacer que solo un negocio pueda editar solo su dureccion
//

router.get('/all',getAllDirecciones);

router.get('/paginate',getDireccionesPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyDireccionById),
    validarCampos
],getDireccionById)

router.post('/',[
    validarJWT,
    check('comuna','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    check('region','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    check('direccion','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    check('numero','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    validarCampos
],crearDireccion)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyDireccionById),
    check('comuna','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    check('region','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    check('direccion','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    check('numero','El nombre del tipo de negocio es obligatorio').not().isEmpty(),
    validarCampos
],modDireccion)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyDireccionById),
    validarCampos
],deleteDireccion)


module.exports = router;