const Redes = require('../models/redes')

const verifyRedById = async(id) =>{
    const red = await Redes.findById(id);
    if(!red){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyRedById
}