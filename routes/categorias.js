
const { Router } = require('express');
const { param } = require('express-validator');

const { getAllHorarios, getHorariosPaginate, getHorarioById, crearHorario, modHorario, deleteHorario } = require('../controllers/horario');
const { verifyHorarioById } = require('../helpers/verifyHorarios');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();
//
    //TODO : Hacer que solo un negocio pueda editar solo su horario
//
router.get('/all',getAllHorarios);

router.get('/paginate',getHorariosPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyHorarioById),
    validarCampos
],getHorarioById)

router.post('/',[
    validarJWT,
    validarCampos
],crearHorario)

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyHorarioById),
    validarCampos
],modHorario)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyHorarioById),
    validarCampos
],deleteHorario)


module.exports = router;