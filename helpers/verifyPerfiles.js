const PerfilUsuario = require('../models/perfiles');

const verifyPerfilId = async (id) => {
    const perfilId = await PerfilUsuario.findById(id);
    if (!perfilId) {
      throw new Error(`El id ${id} no existe`);
    }
  };
const verifyPerfilUserByIdUser = async(idUsuario)=>{
    const existePerfilDeUsuario = await PerfilUsuario.findOne({usuario:idUsuario});
    if(existePerfilDeUsuario) return true;
    return false;
}
const getIdPerfilByIdUser = async(id)=>{
  const perfilUser = await PerfilUsuario.findOne({usuario:id});
  if(!perfilUser) return null;
  return perfilUser;
}
module.exports = {
    verifyPerfilId,
    verifyPerfilUserByIdUser,
    getIdPerfilByIdUser
}