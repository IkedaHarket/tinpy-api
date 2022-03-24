/*
    Rol Schema
*/
const {Schema, model} = require('mongoose');

const RolesSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del rol es obligatorio"],
  },
});

module.exports = model('Rol',RolesSchema);