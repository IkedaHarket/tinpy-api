const PerfilUsuario = require('../models/perfiles');

const verifyPerfilId = async (id) => {
    const perfilId = await PerfilUsuario.findById(id);
    if (!perfilId) {
      throw new Error(`El id ${id} no existe`);
    }
  };

module.exports = {
    verifyPerfilId
}