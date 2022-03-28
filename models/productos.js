/*
    Productos Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductosSchema =  new Schema(
    {
      usuarioAutor:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
      },
      nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
      },
      precio:{
          type:Number,
          required:[true, "El precio es obligatorio"]
      },
      descripcion:{
        type: String
      },
      numeroLikes:{
        type:Number,
      },
      likes:[
        {
        type: Schema.Types.ObjectId,
        ref: "PerfilUsuario",
      }],
      estado:{
          type:Boolean,
          default:true
      },
      imagenPrincipal:{
          type:String,
          default:'defaultProducto.png'
      },
      categoria:{
            type: Schema.Types.ObjectId,
            ref: "CategoriaProducto",
        } 
    },
    {
      timestamps: true,
    }
  );

ProductosSchema.plugin(mongoosePaginate);


module.exports = model('Producto',ProductosSchema);