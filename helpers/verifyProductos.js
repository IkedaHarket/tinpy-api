const Producto = require('../models/productos')

const verifyProductoById = async(id) =>{
    const producto = await Producto.findById(id);
    if(!producto){
        throw new Error(`El id ${id} no existe`);
    }
}
const verifyUsuarioLikeProducto = async(idProducto,idUser) => {
    const producto = await Producto.findById(idProducto)
    let existe = false;
    producto.likes.map(user=>{
        if (user.equals(idUser)) existe = true;
    })
    return existe;
}
module.exports = {
    verifyProductoById,
    verifyUsuarioLikeProducto
}