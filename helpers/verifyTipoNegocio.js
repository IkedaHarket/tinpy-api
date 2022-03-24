const TipoNegocio = require('../models/tipoNegocio')

const verifyTipoNegocioById = async(id) =>{
    const tipoNegocio = await TipoNegocio.findById(id);
    if(!tipoNegocio){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyTipoNegocioById
}