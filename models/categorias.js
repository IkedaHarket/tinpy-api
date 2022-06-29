/*
    Categoria Categoria Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const CategoriaProductoSchema =  new Schema(
    {
      nombre: {
        type: String,
        required: [true, "El tipo de negocio es obligatorio"],
      },
      descripcion: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
);

CategoriaProductoSchema.plugin(mongoosePaginate);


module.exports = model('CategoriaProducto',CategoriaProductoSchema);