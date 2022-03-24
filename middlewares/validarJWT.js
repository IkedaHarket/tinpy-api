
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuarios');

const validarJWT = async(req,res,next)=>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }
    try {
        
        const {uid}  =jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg:"Token no valido"
            });
        }
        req.usuario = usuario;
        req.uid = uid
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

module.exports = {
    validarJWT
}