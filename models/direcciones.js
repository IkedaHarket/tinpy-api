/*
    Direcciones Schema
*/
const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const DireccionesSchema = new Schema({
  comuna: {
    type: String,
    // required: [true, "La comuna es obligatoria"],
  },
  region: {
    type: String,
    // required: [true, "La region es obligatoria"],
  },
  direccion: {
    type: String,
    // required: [true, "La direccion es obligatoria"],
  },
  numero: {
    type: String,
    // required: [true, "El numero es obligatorio"],
  },
  lng: {
    type: String
  },
  lat: {
    type: String
  },
},
{
  timestamps: true,
}
);
DireccionesSchema.plugin(mongoosePaginate);
module.exports = model('Direccion',DireccionesSchema);