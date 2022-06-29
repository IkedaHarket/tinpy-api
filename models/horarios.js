/*
    Categoria Horario Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const HorariosSchema =  new Schema(
    {
      negocio: {
        type: Schema.Types.ObjectId,
        ref: "Negocio",
        required: [true, "El negocio del comentario es obligatorio"],
        unique:true
      },
      lunes_inicio: {
        type: String,
      },
      lunes_cierre: {
        type: String,
      },
      martes_inicio: {
        type: String,
      },
      martes_cierre: {
        type: String,
      },
      miercoles_inicio: {
        type: String,
      },
      miercoles_cierre: {
        type: String,
      },
      jueves_inicio: {
        type: String,
      },
      jueves_cierre: {
        type: String,
      },
      viernes_inicio: {
        type: String,
      },
      viernes_cierre: {
        type: String,
      },
      sabado_inicio: {
        type: String,
      },
      sabado_cierre: {
        type: String,
      },
      domingo_inicio: {
        type: String,
      },
      domingo_cierre: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
);

HorariosSchema.plugin(mongoosePaginate);


module.exports = model('Horarios',HorariosSchema);