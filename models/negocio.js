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
      totalEstrellas:{
          type: Number,
          default: 0,
      },
      estrellas:[
            {type: Schema.Types.ObjectId, ref: "PerfilUsuario"},
            {type: Number, default:0}
      ],
      promedioEstrellas:{
          type:Number,
          default: 0
      },
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
      horario:{
        type: Schema.Types.ObjectId,
        ref: "Horarios",
      },
      telefono: {
        type: String,
      },
      correo: {
        type: String,
      },
      descripcion:{
          type: String,
      },
      // redes:[{
      //   type: Schema.Types.ObjectId,
      //   ref: "Redes",
      // }]
    },
    {
      timestamps: true,
    }
  );

NegocioSchema.plugin(mongoosePaginate);


module.exports = model('Negocio',NegocioSchema);