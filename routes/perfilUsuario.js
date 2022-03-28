
const { Router } = require('express');
const { param } = require('express-validator');

const { fileUpload } = require('../middlewares/fileUpload');
const { crearPerfil, getAllPerfiles, getPerfilesUsersPaginate, getPerfilById, modPerfilUser, deletePerfilUser, getPerfilByUsuario } = require('../controllers/perfilUsuario');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { verifyPerfilId } = require('../helpers/verifyPerfiles');



const router = new Router();

router.get('/all',getAllPerfiles);

router.get('/paginate',getPerfilesUsersPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyPerfilId),
    validarCampos
],getPerfilById)

router.get('/usuario/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    validarCampos
],getPerfilByUsuario)

router.post('/',[
    validarJWT,
    fileUpload,
    validarCampos
],crearPerfil);

router.put('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyPerfilId),
    fileUpload,
    validarCampos
],modPerfilUser)

router.delete('/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyPerfilId),
    validarCampos
],deletePerfilUser)



module.exports = router;