/*
    Redes Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const RedesSchema =  new Schema(
    {
      negocio: {
        type: Schema.Types.ObjectId,
        ref: "Negocio",
        required: [true, "El negocio del producto es obligatorio"],
      },
      nombre: {
        type: String,
        required: [true, "El nombre es de la red"],
      },
      enlace:{
          type: String,
          required: [true, "El enlace a la red es obligatorio"],
      },
      color:{
        type:String,
        default:'#B83CCF'
      }
    },
    {
      timestamps: true,
    }
  );

RedesSchema.plugin(mongoosePaginate);


module.exports = model('Redes',RedesSchema);