const {Router} = require('express');
const { check,param } = require('express-validator');
const { crearEnlace, modEnlace, getAllRedes, getRedesPaginate, getRedById, deleteRed } = require('../controllers/redes');
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