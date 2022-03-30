
const {Router} = require('express');
const { check, param } = require('express-validator');
const { crearProducto, getAllProductos, getProductosPaginate, getProductoById, modProducto, modEstadoProduto, deleteProducto, addLikeProducto, removeLikeProducto } = require('../controllers/productos');
const { verifyProductoById } = require('../helpers/verifyProductos');
const { fileUpload } = require('../middlewares/fileUpload');
const { validarCampos } = require('../middlewares/validarCampos');

const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();

router.get('/all',getAllProductos);

router.get('/paginate',getProductosPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],getProductoById)

router.post('/',[
    validarJWT,
    fileUpload,
    validarCampos
],crearProducto)
router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    fileUpload,
    validarCampos
],modProducto)
router.put('/estado/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],modEstadoProduto)

router.put('/add-like/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],addLikeProducto)
router.put('/remove-like/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],removeLikeProducto)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],deleteProducto)
module.exports = router;