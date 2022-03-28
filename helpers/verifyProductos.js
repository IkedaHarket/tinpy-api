const Producto = require('../models/productos')

const verifyProductoById = async(id) =>{
    const producto = await Producto.findById(id);
    if(!producto){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyProductoById
}