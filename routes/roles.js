
const {Router} = require('express');

const {getRoles} =      require("../controllers/roles");
const { validarJWT } = require('../middlewares/validarJWT');

const router =  new Router();

router.get('/',[
    validarJWT
],getRoles);

module.exports = router;