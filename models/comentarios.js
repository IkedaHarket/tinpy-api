/*
    Comentarios Schema
*/
const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const ComentariosSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  negocio: {
    type: Schema.Types.ObjectId,
    ref: "Negocio",
    required: [true, "El negocio del comentario es obligatorio"],
  },
  perfilUsuario: {
    type: Schema.Types.ObjectId,
    ref: "PerfilUsuario",
    required: [true, "El creador del comentario es obligatorio"],
  },
  texto: {
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
  numeroDislikes:{
    type:Number,
  },
  dislikes:[{
    type: Schema.Types.ObjectId,
    ref: "PerfilUsuario",
  }],
  estadoAnimo: {
    type: Schema.Types.ObjectId,
    ref: "EstadosAnimo",
  },
},
{
  timestamps: true,
});
ComentariosSchema.plugin(mongoosePaginate);
module.exports = model('Comentario',ComentariosSchema);