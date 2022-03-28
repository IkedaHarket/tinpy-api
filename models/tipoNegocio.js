/*
    Tipo Negocio Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const TipoNegocioSchema =  new Schema(
    {
      nombre: {
        type: String,
        required: [true, "El tipo de negocio es obligatorio"],
      },
    },
    {
      timestamps: true,
    }
  );

TipoNegocioSchema.plugin(mongoosePaginate);


module.exports = model('TipoNegocio',TipoNegocioSchema);