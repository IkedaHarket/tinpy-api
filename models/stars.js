/*
    Estrellas Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const StarsNegocio =  new Schema(
    {
        perfil:  {type: Schema.Types.ObjectId, ref: "PerfilUsuario"},
        numeroEstrellas: {type: Number, default:0},
    },
    {
      timestamps: true,
    }
  );

StarsNegocio.plugin(mongoosePaginate);
module.exports = model('StarsNegocio',StarsNegocio);