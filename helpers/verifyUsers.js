/*
    Helpers para verificar en la bd de usuarios
*/
const Usuario = require("../models/usuarios")
const Rol =     require("../models/roles");

const verifyEmailReg = async (correo) => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`Este correo ya se encuentra registrado`);
  }
};

const verifyEmailNoReg = async (correo) => {
  const existeCorreo = await Usuario.findOne({ correo });
  if (!existeCorreo) {
    throw new Error(`Este correo no se encuentra registrado`);
  }
};

const verifyUserId = async (id) => {
  const userId = await Usuario.findById(id);
  if (!userId) {
    throw new Error(`El id ${id} no existe`);
  }
};
const verifyUserRol = async (req, res, rol) => {
  const rolBD = await Rol.findById(req.usuario?.rol);
  if (rolBD.nombre != rol) {
    return res.status(401).json({
      ok: false,
      msg: "Usted no tiene permitido hacer esto",
    });
  }
};
const verifyUserAdmin = async(req)=>{
  const rol = await Rol.findById(req.usuario.rol);
  if(rol.nombre != 'admin') return false;
  return  true
}
module.exports = {
    verifyEmailReg,
    verifyEmailNoReg,
    verifyUserId,
    verifyUserRol,
    verifyUserAdmin,
}