const Negocio = require("../models/negocio");
const Stars = require("../models/stars");

const verifyPerfilUserHaveStar = async(idPerfil,idNegocio) =>{
    const negocio = await Negocio.findById(idNegocio).populate({ path: 'estrellas', model: 'StarsNegocio'},)
    let resp = {resp: false};
    negocio.estrellas.map(star => {
        if (star.perfil.equals(idPerfil)) resp = {resp:true, star};
    })
    return resp;
}

module.exports = {
    verifyPerfilUserHaveStar
}