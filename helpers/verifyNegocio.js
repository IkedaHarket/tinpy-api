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
const verifyRouterNegocioByIdUser = async(id) =>{
    const negocio = await Negocio.findOne({usuario:id});
    if(!negocio){
        throw new Error(`El id ${id} no tiene un negocio asociado`);
    }
}
const getNegocioByIdUser = async(usuario) =>{
    const negocio = await Negocio.findOne({usuario})
    if(!negocio)return false;
    return negocio;
}
const verifyUsuarioStarsNegocio = async(idNegocio,idUser) => {
    const producto = await Negocio.findById(idNegocio)
    let existe = false;
    producto.estrellas.map(user=>{
        if (user.equals(idUser)) existe = true;
    })
    return existe;
}
module.exports = {
    verifyNegocioByIdUser,
    verifyNegocioById,
    getNegocioByIdUser,
    verifyRouterNegocioByIdUser,
    verifyUsuarioStarsNegocio
}