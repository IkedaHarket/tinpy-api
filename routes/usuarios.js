const {Router} = require('express');
const { check, param } = require("express-validator");

const { getAllUsers, getUserById, banearUsuario, changeRolUser, changePassword, getUsersPaginate, verifyUser } = require("../controllers/usuarios")
const { verifyUserId, verifyEmailNoReg } = require('../helpers/verifyUsers');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { verifyRolId } = require('../helpers/verifyRol');

const router = new Router();

router.get('/all',getAllUsers);

router.get('/paginate',getUsersPaginate);

router.get('/:id',[
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyUserId),
    validarCampos
],getUserById)

router.put('/verify/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyUserId),
    validarCampos
],verifyUser);


router.put('/ban/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyUserId),
    validarCampos
],banearUsuario);

router.put('/changeRol/:rol/:id',[
    validarJWT,
    param('id','El ID no puede estar vacio').not().isEmpty(),
    param('id', 'No es un ID valido').isMongoId(),
    param('id').custom(verifyUserId),
    param('rol','El rol no puede estar vacio').not().isEmpty(),
    param('rol', 'No es un ID valido').isMongoId(),
    param('rol').custom(verifyRolId),
    validarCampos
],changeRolUser);

router.put('/changePass',[
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(verifyEmailNoReg),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    check('oldPassword','La contraseña anterior es obligatoria').not().isEmpty(),
    validarCampos
],changePassword)

module.exports = router;