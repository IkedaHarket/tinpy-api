/*
    Estados Animos Schema
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const EstadosAnimosSchema =  new Schema(
    {
        nombre: {
            type: String,
            required: [true, "El estado de animo es obligatorio"],
          },
          descripcion: {
            type: String,
          },
    },
    {
      timestamps: true,
    }
  );

EstadosAnimosSchema.plugin(mongoosePaginate);


module.exports = model('EstadosAnimo',EstadosAnimosSchema);