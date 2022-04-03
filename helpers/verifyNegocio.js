const Negocio = require("../models/negocio");


const verifyNegocioByIdUser = async(idUsuario)=>{
    const existeNegocioDelUsuario = await Negocio.findOne({usuario:idUsuario});
    if(existeNegocioDelUsuario) return true;
    return false;
}

const verifyNegocioById = async(id) =>{
    const negocio = await Negocio.findById(id);
    if(!negocio){
        throw new Error(`El id ${id} no existe`);
    }
}
const getNegocioByIdUser = async(usuario) =>{
    const negocio = await Negocio.findOne({usuario})
    if(!negocio)return false;
    return negocio;
}
module.exports = {
    verifyNegocioByIdUser,
    verifyNegocioById,
    getNegocioByIdUser
}