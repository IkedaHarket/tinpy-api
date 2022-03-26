const CategoriaProducto = require('../models/categorias')

const verifyCategoriaById = async(id) =>{
    const categoria = await CategoriaProducto.findById(id);
    if(!categoria){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyCategoriaById
}