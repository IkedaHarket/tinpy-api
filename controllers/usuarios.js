
const {verifyUserRol} = require("../helpers/verifyUsers");
const Usuario = require("../models/usuarios");
const bcryptjs = require("bcryptjs") ;

const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate([
      { path: 'rol', model: 'Rol' },
  ]);

    return res.status(200).json({
      ok: true,
      usuarios,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
const getUsersPaginate = async (req, res) => {
  try {
    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      populate:[
        { path: 'rol', model: 'Rol' }
      ]
    };

    const users = await Usuario.paginate({}, options);

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
const getUserById = async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await Usuario.findById(id).populate([
          { path: 'rol', model: 'Rol' },
      ]); 
        
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const verifyUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (await verifyUserRol(req, res, "admin")) return false;

    const { verify } = await Usuario.findById(id);
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { verify: !verify },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error Interno del servidor",
    });
  }
};

const banearUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    if (await verifyUserRol(req, res, "admin")) return false;

    const { estado } = await Usuario.findById(id);
    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { estado: !estado },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error Interno del servidor",
    });
  }
};
const changeRolUser = async (req, res) => {
  try {
    const { rol, id } = req.params;

    if (await verifyUserRol(req, res, "admin")) return false;

    const usuario = await Usuario.findByIdAndUpdate(id, { rol }, { new: true });

    return res.status(200).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error Interno del servidor",
    });
  }
};
const changePassword = async (req, res) => {
  try {
    let { password, oldPassword, correo} = req.body;

    const usuario = await Usuario.findOne({correo});
    const validPassword = bcryptjs.compareSync(oldPassword, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        errors: [{ msg: "Usuario o contraseña incorrectos" }],
      });
    }
    // //* Encriptar password
    const salt = bcryptjs.genSaltSync(10);
    password = bcryptjs.hashSync(password, salt);

    const newUsuario = await Usuario.findByIdAndUpdate(usuario._id,{...usuario._doc, password},{new:true});

    return res.status(200).json({
      ok: true,
      newUsuario
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error Interno del servidor",
    });
  }
};

module.exports = {
    getAllUsers,
    getUsersPaginate,
    getUserById,
    banearUsuario,
    changeRolUser,
    changePassword,
    verifyUser
}
