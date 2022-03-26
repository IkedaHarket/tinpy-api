const EstadosAnimo = require('../models/estadosAnimos')

const verifyEstadosAnimoById = async(id) =>{
    const estadoAnimo = await EstadosAnimo.findById(id);
    if(!estadoAnimo){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyEstadosAnimoById
}