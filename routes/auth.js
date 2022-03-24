const {Router} = require('express');
const {check} = require('express-validator');
const { register, login, renewToken, googleSignin, forgotPass} = require("../controllers/auth");

const {validarCampos} = require("../middlewares/validarCampos")
const { verifyEmailNoReg, verifyEmailReg } = require("../helpers/verifyUsers");
const {validarJWT} = require("../middlewares/validarJWT");

const router = new Router();


router.post('/register',[
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(verifyEmailReg),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
], register);

router.post('/login',[
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    validarCampos
],login)

router.post('/google',[
    check('id_token','El id token es necesario').not().isEmpty(),
    validarCampos
],googleSignin);

router.get( '/renew', validarJWT , renewToken );

router.post('/forgot',[
    check('correo','El correo no es valido').isEmail(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('correo').custom(verifyEmailNoReg),
    validarCampos
],forgotPass)

module.exports = router;