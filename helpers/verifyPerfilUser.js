const PerfilUsuario = require('../models/perfiles')

const verifyPerfilUserByIdUser = async(idUsuario)=>{
    const existePerfilDeUsuario = await PerfilUsuario.findOne({usuario:idUsuario});
    if(existePerfilDeUsuario) return true;
    return false;
}

module.exports = {
    verifyPerfilUserByIdUser
}