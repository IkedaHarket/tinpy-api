
const {Router} = require('express');
const { check, param } = require('express-validator');
const { crearProducto, getAllProductos, getProductosPaginate, getProductoById, modProducto, modEstadoProduto, deleteProducto, addLikeProducto, removeLikeProducto, getProductosByIdNegocioPaginate, getAllProductosByIdNegocio, getProductosByName, addDislikeProducto, removeDislikeProducto, getProductosByNamePaginate } = require('../controllers/productos');
const { verifyCategoriaById } = require('../helpers/verifyCategorias');
const { verifyNegocioById } = require('../helpers/verifyNegocio');
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
router.get('/name/:name',[
    param('name','El nombre no puede estar vacio').not().isEmpty(),
    validarCampos
],getProductosByName)
router.get('/name-paginate/:name',[
    param('name','El nombre no puede estar vacio').not().isEmpty(),
    validarCampos
],getProductosByNamePaginate)

router.get('/negocio-productos-all/:idNegocio',[
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    validarCampos
],getAllProductosByIdNegocio)

router.get('/negocio-productos-paginate/:idNegocio',[
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    validarCampos
],getProductosByIdNegocioPaginate)

router.post('/',[
    validarJWT,
    fileUpload,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatoria').isMongoId(),
    check('categoria').custom(verifyCategoriaById),
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

router.put('/add-dislike/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],addDislikeProducto)
router.put('/remove-dislike/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],removeDislikeProducto)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyProductoById),
    validarCampos
],deleteProducto)
module.exports = router;