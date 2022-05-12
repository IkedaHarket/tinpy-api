/*
    Negocio Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const NegocioSchema =  new Schema(
    {
      usuario: {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
          required: [true, "El usuario es obligatorio"],
          unique:true
      },
      tipoNegocio: {
        type: Schema.Types.ObjectId,
        ref: "TipoNegocio",
        required: [true, "El tipo de negocio es obligatorio"]
      },
      img: {
        type: String,
        default: 'defaultNegocio.png',
      },
      nombre:{
        type: String,
        required: [true, "El nombre del negocio es obligatorio"]
      },
      estrellas:[ {type: Schema.Types.ObjectId, ref: "StarsNegocio"} ],
      direccion:{
        type: Schema.Types.ObjectId,
        ref: "Direccion",
      },
      estado:{
        type:Boolean,
        default:true
      },
      verificado:{
        type:Boolean,
        default:false
      },
      telefono: {
        type: String,
      },
      correo: {
        type: String,
      },
      descripcion:{
          type: String,
      }
    },
    {
      timestamps: true,
    }
  );

NegocioSchema.plugin(mongoosePaginate);


module.exports = model('Negocio',NegocioSchema);