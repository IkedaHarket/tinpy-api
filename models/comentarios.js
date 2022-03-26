/*
    Comentarios Schema
*/
const {Schema, model} = require('mongoose');

const ComentariosSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El titulo es obligatorio"],
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
  numeroDisLikes:{
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

module.exports = model('Comentario',ComentariosSchema);