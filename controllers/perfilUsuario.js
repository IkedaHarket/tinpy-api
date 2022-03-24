
const PerfilUsuario = require('../models/perfiles');
const { verifyPerfilUserByIdUser } = require('../helpers/verifyPerfilUser')


const crearPerfil = async(req,res) => {
    try {
        const {...data} = req.body;
        const {_id: idUser} = req.usuario;

        if(await verifyPerfilUserByIdUser(idUser)){
            return res.status(200).json({
                ok:false,
                msg:'Este usuario ya tiene un perfil asociados'
            })
        }
        data.img = req.file.filename;

        const nuevoPerfil = new PerfilUsuario({...data,usuario:idUser});
        await nuevoPerfil.save(); 

        return res.status(200).json({
            ok:true,
            nuevoPerfil
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
} 
module.exports = {
    crearPerfil
}