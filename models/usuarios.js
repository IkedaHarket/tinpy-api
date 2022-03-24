/*
    User Template
*/

const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const UsuarioSchema = new Schema(
    {
      correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
      },
      rol: {
        type: Schema.Types.ObjectId,
        ref: "Rol",
      },
      verify: {
        type: Boolean,
        default: false,
      },
      estado: {
        type: Boolean,
        default: true,
      },
      googleAuth: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

UsuarioSchema.plugin(mongoosePaginate);

UsuarioSchema.methods.toJSON = function(){
    let {__v,password,_id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario',UsuarioSchema);