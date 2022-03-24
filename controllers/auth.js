
const bcryptjs  = require("bcryptjs");

const Usuario   = require("../models/usuarios");
const Rol       = require("../models/roles");

const generarJWT = require("../helpers/generarJWT");
const googleVerify = require("../helpers/googleVerify");
const { sendCorreo } = require("../helpers/sendCorreo");

const register = async (req, res) => {
  try {
    let { correo, password } = req.body;

    const { _id } = await Rol.findOne({ nombre: "usuario" });

    // //* Encriptar password
    const salt = bcryptjs.genSaltSync(10);
    password = bcryptjs.hashSync(password, salt);

    // //* Guardar usuario
    const usuario = new Usuario({ correo, password, rol: _id });
    await usuario.save();

    // //*Generar token
    const token = await generarJWT(usuario.uid);
    return res.status(201).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        errors: [{ msg: "Usuario o contraseña incorrectos" }],
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        errors: [{ msg: "Usuario o contraseña incorrectos" }],
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        errors: [{ msg: "Este usuario se encuentra deshabilitado" }],
      });
    }
    const token = await generarJWT(usuario.id);

    return res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error Interno del servidor",
    });
  }
};
const googleSignin = async (req, res) => {
  const { id_token } = req.body;

  try {
    let { correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo }); 

    if (!usuario) {
      const { _id } = await Rol.findOne({ nombre: "usuario" });
      const data = {
        correo,
        password: "Cuenta Google :)",
        rol:_id,
        googleAuth: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Este usuario se encuentra baneado :(",
      });
    }

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error interno del servidor",
    });
  }
};
const renewToken = async (req, res) => {
  const { usuario, uid } = req;

  // Generar el JWT
  const token = await generarJWT(uid);
  res.json({
    ok: true,
    usuario,
    token,
  });
};
const forgotPass = async(req, res) =>{
  try {
      const {correo} = req.body
      const token = await generarJWT(correo);

      await sendCorreo({
          from: 'Tinpy BOT', // sender address
          to: correo, // list of receivers
          subject: "Restablecer Contraseña", // Subject line
          html: `<h1>Restablecer </h1>
                  <h3>Haga click en el siguiente enlace para restablecer su contraseña</h3>
                  <a href="http://www.localhost:4200/auth/reset-password/${token}" >http://www.localhost:4200/auth/reset-password/${token}</a>
                  <br /><br />
                  <hr /> <i>Este correo a sido enviado desde la API de Tinpy Services </i>`, 
      });


      return res.status(200).json({
          ok:true,
          msg:`Correo de recuperacion enviado a ${correo}`
      })
  } catch (error) {
      console.log(error)
      return res.status(500).json({
          msg:"Error Interno del servidor",
      })
  }
}

module.exports = {
  register,
  login,
  googleSignin,
  renewToken,
  forgotPass,
}