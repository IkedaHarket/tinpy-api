const Rol =     require("../models/roles");

/*
*    Requiere haber usado validarJWT (./validarJWT.js) previamente
*/

const validarAdmin = async(req,res,next)=>{
    const rol = await Rol.findById(req.usuario.rol);
    if(rol.nombre != 'admin') {
        return res.status(401).json({
            msg:"No tiene acceso a este recurso"
        });
    }
    next();
}

module.exports = {
    validarAdmin
}