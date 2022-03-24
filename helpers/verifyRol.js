const Rol = require('../models/roles')

const verifyRolId = async(id) =>{
    const rolId = await Rol.findById(id);
    if(!rolId){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyRolId
}