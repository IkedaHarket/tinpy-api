
const { Router } = require('express');
const { check,param } = require('express-validator');
const { crearComentario, getAllComentarios, getComentariosPaginate, getComentarioById, modComentario, deleteComentario, agregarLike, removeLike, agregarDislike, removeDislike } = require('../controllers/comentarios');
const { verifyComentarioById } = require('../helpers/verifyComentarios');
const { verifyEstadosAnimoById } = require('../helpers/verifyEstadosAnimos');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();

router.get('/all',getAllComentarios);
router.get('/paginate',getComentariosPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    validarCampos
],getComentarioById)

router.post('/',[
    validarJWT,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('estadoAnimo','El estado de animo es obligatorio').not().isEmpty(),
    check('estadoAnimo').custom(verifyEstadosAnimoById),
    validarCampos
],crearComentario);
router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('estadoAnimo','El estado de animo es obligatorio').not().isEmpty(),
    check('estadoAnimo').custom(verifyEstadosAnimoById),
    validarCampos
],modComentario)

router.put('/add-like/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    validarCampos
],agregarLike)
router.put('/remove-like/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    validarCampos
],removeLike)

router.put('/add-dislike/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    validarCampos
],agregarDislike)
router.put('/remove-dislike/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    validarCampos
],removeDislike)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyComentarioById),
    validarCampos
],deleteComentario)

module.exports = router;