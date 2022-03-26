
const { Router } = require('express');
const { check,param } = require('express-validator');

const { getAllEstadosAnimos, getEstadosAnimosPaginate, getEstadoAnimoById, crearEstadoAnimo, modEstadoAnimo, deleteEstadoAnimo } = require('../controllers/estadosAnimos');
const { verifyEstadosAnimoById } = require('../helpers/verifyEstadosAnimos');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { validarAdmin } = require('../middlewares/verifyAdmin');

const router =  new Router();

router.get('/all',getAllEstadosAnimos);

router.get('/paginate',getEstadosAnimosPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyEstadosAnimoById),
    validarCampos
],getEstadoAnimoById)

router.post('/',[
    validarJWT,
    validarAdmin,
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    validarCampos
],crearEstadoAnimo)

router.put('/:id',[
    validarJWT,
    validarAdmin,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyEstadosAnimoById),
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    validarCampos
],modEstadoAnimo)

router.delete('/:id',[
    validarJWT,
    validarAdmin,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyEstadosAnimoById),
    validarCampos
],deleteEstadoAnimo)


module.exports = router;