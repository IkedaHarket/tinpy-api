/*
    User Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const PerfilUsuarioSchema =  new Schema(
    {
      usuario: {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
          required: [true, "El usuario es obligatorio"],
          unique:true
      },
      nombre: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"],
      },
      telefono: {
          type: String,
      },
      img: {
        type: String,
        default: 'default.png',
      },
      estado: {
        type: Boolean,
        default: true,
      },
      descripcion: {
        type: String
      },
      enlace: {
          type: String
      },
    },
    {
      timestamps: true,
    }
  );

PerfilUsuarioSchema.plugin(mongoosePaginate);


module.exports = model('PerfilUsuario',PerfilUsuarioSchema);