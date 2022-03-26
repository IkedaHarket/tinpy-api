
const { Router } = require('express');
const { check,param } = require('express-validator');

const { getAllCategorias, getCategoriasPaginate, getCategoriaById, crearCategorias, modCategoria, deleteCategoria } = require('../controllers/categorias');
const { verifyCategoriaById } = require('../helpers/verifyCategorias');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { validarAdmin } = require('../middlewares/verifyAdmin');

const router =  new Router();

router.get('/all',getAllCategorias);

router.get('/paginate',getCategoriasPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyCategoriaById),
    validarCampos
],getCategoriaById)

router.post('/',[
    validarJWT,
    validarAdmin,
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    validarCampos
],crearCategorias)

router.put('/:id',[
    validarJWT,
    validarAdmin,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyCategoriaById),
    check('nombre','El nombre de la categoria es obligatoria').not().isEmpty(),
    validarCampos
],modCategoria)

router.delete('/:id',[
    validarJWT,
    validarAdmin,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyCategoriaById),
    validarCampos
],deleteCategoria)


module.exports = router;