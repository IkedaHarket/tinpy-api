const Comentario = require('../models/comentarios')
const PerfilUsuario = require('../models/perfiles')

const verifyComentarioById = async(id) =>{
    const comentario = await Comentario.findById(id);
    if(!comentario){
        throw new Error(`El id ${id} no existe`);
    }
}
const isAutorComentario = async(req,idComentario) =>{
    const perfil = await PerfilUsuario.findOne({usuario:req.usuario});
    if(!perfil) return null;
    const comentario = await Comentario.findById(idComentario);
    if(!comentario) return null;
    if(perfil._id == comentario.perfilUsuario) return true
    return false;
}
module.exports = {
    verifyComentarioById,
    isAutorComentario
}