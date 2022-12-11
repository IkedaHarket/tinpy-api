
const PerfilUsuario = require('../models/perfiles');
const { verifyPerfilUserByIdUser } = require('../helpers/verifyPerfiles');
const { deleteImg } = require('../helpers/deleteImg');
const { verifyUserAdmin } = require('../helpers/verifyUsers');

const getAllPerfiles = async(req,res) =>{
    try {

        const perfiles = await PerfilUsuario.find({estado:true}).populate([
            { path: 'usuario', model: 'Usuario' },
        ]);

        return res.status(200).json(perfiles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
};
const getPerfilesUsersPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        populate:[
            { path: 'usuario', model: 'Usuario' },
        ]
        
      };
  
      const perfiles = await PerfilUsuario.paginate({estado:true}, options);
  
      return res.status(200).json(perfiles);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getPerfilById = async (req, res) =>{
    try {
        const {id} = req.params;
        const perfil = await PerfilUsuario.findById(id).populate([
            { path: 'usuario', model: 'Usuario' },
      ]); 
        
        return res.status(200).json(perfil)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const getPerfilByUsuario = async (req, res) =>{
    try {
        const {id} = req.params;

        const perfil = await PerfilUsuario.findOne({usuario:id}).populate([
            { path: 'usuario', model: 'Usuario' },
        ]); 
        
        return res.status(200).json(perfil)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearPerfil = async(req,res) => {
    try {
        const {...data} = req.body;
        const {_id: idUser} = req.usuario;

        if(await verifyPerfilUserByIdUser(idUser)){
            return res.status(400).json({
                ok:false,
                msg:'Este usuario ya tiene un perfil asociado'
            })
        }
        data.img = 'default.png'
        if(req.file){
            data.img = req.file.filename;
        }

        const perfil = new PerfilUsuario({...data,usuario:idUser});
        await perfil.save(); 

        return res.status(200).json({
            ok:true,
            msg:'Perfil creado con exito',
            perfil
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
} 
const modPerfilUser = async(req,res) =>{
    try {
        const {id} = req.params;

        const oldPerfil = await PerfilUsuario.findById(id);
        const userAdmin = await verifyUserAdmin(req)
        if(!(oldPerfil.usuario.equals(req.usuario._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }
        // if(oldPerfil.img != 'default.png') deleteImg(oldPerfil.img)

        const {...data} = req.body;
        
        if(!data.img) data.img = oldPerfil.img;
        if(req.file) data.img = req.file.filename;

        

        const perfil = await PerfilUsuario.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Perfil actualizado con exito',
            perfil
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deletePerfilUser = async(req,res) =>{
    try {
        const {id} = req.params;

        const oldPerfil = await PerfilUsuario.findById(id);

        const userAdmin = await verifyUserAdmin(req)
        if(!(oldPerfil.usuario.equals(req.usuario._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }

        if(oldPerfil.img != 'default.png') deleteImg(oldPerfil.img)
        const perfil = await PerfilUsuario.findByIdAndUpdate(id,{estado:!oldPerfil.estado ,img:'default.png'},{new:true})

        return res.status(200).json({
            ok:true,
            msg:'Perfil actualizado con exito',
            perfil
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
module.exports = {
    getAllPerfiles,
    getPerfilesUsersPaginate,
    getPerfilById,
    getPerfilByUsuario,
    crearPerfil,
    modPerfilUser,
    deletePerfilUser,
}