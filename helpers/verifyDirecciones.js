const Direccion = require('../models/direcciones')

const verifyDireccionById = async(id) =>{
    const direccion = await Direccion.findById(id);
    if(!direccion){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyDireccionById
}