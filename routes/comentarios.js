
const { Router } = require('express');
const { check,param } = require('express-validator');
const { crearComentario, getAllComentarios, getComentariosPaginate, getComentarioById, modComentario, deleteComentario, agregarLike, removeLike, agregarDislike, removeDislike, getComentarioByIdNegocio, getAllComentariosByIdNegocio, getComentariosByIdNegocioPaginate, getAllComentariosByIdPerfil, getComentariosByIdPerfilPaginate } = require('../controllers/comentarios');
const { verifyComentarioById } = require('../helpers/verifyComentarios');
const { verifyEstadosAnimoById } = require('../helpers/verifyEstadosAnimos');
const { verifyNegocioById } = require('../helpers/verifyNegocio');
const { verifyPerfilId } = require('../helpers/verifyPerfiles');

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

router.get('/negocio-comentarios-all/:idNegocio',[
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    validarCampos
],getAllComentariosByIdNegocio)

router.get('/negocio-comentarios-paginate/:idNegocio',[
    param('idNegocio','El ID no puede estar vacio').not().isEmpty(),
    param('idNegocio', 'No es un ID valido').isMongoId(),
    param('idNegocio').custom(verifyNegocioById),
    validarCampos
],getComentariosByIdNegocioPaginate)

router.get('/perfil-comentarios-all/:idPerfil',[
    param('idPerfil','El ID no puede estar vacio').not().isEmpty(),
    param('idPerfil', 'No es un ID valido').isMongoId(),
    param('idPerfil').custom(verifyPerfilId),
    validarCampos
],getAllComentariosByIdPerfil)

router.get('/perfil-comentarios-paginate/:idPerfil',[
    param('idPerfil','El ID no puede estar vacio').not().isEmpty(),
    param('idPerfil', 'No es un ID valido').isMongoId(),
    param('idPerfil').custom(verifyPerfilId),
    validarCampos
],getComentariosByIdPerfilPaginate)

router.post('/',[
    validarJWT,
    check('titulo','El titulo es obligatorio').not().isEmpty(),
    check('estadoAnimo','El estado de animo es obligatorio').not().isEmpty(),
    check('estadoAnimo').custom(verifyEstadosAnimoById),
    check('negocio','El negocio es obligatorio').not().isEmpty(),
    check('negocio').custom(verifyNegocioById),
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
    check('negocio','El negocio es obligatorio').not().isEmpty(),
    check('negocio').custom(verifyNegocioById),
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