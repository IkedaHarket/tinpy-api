/*
    Categoria Producto Controller
*/
const { datacatalog } = require('googleapis/build/src/apis/datacatalog');
const { isAutorComentario } = require('../helpers/verifyComentarios');
const { getIdPerfilByIdUser } = require('../helpers/verifyPerfiles');
const { verifyUserAdmin } = require('../helpers/verifyUsers');
const Comentario = require('../models/comentarios');


const getAllComentarios = async(req,res)=>{
    try {
        const comentarios = await Comentario.find().populate([
            { 
                path: 'perfilUsuario', 
                model: 'PerfilUsuario',
                populate:{path:'usuario',model:'Usuario'}
             },
            { path: 'estadoAnimo', model: 'EstadosAnimo', select:'nombre' },
        ]);
    
        return res.status(200).json({
          ok: true,
          comentarios,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Error interno del servidor",
        });
      }
}
const getComentariosPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,     
        populate:[
            { 
                path: 'perfilUsuario', 
                model: 'PerfilUsuario',
                populate:{path:'usuario',model:'Usuario'}
             },
            { path: 'estadoAnimo', model: 'EstadosAnimo', select:'nombre' },
        ]   
      };
      const comentarios = await Comentario.paginate({}, options);
  
      return res.status(200).json(comentarios);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getComentarioById = async (req, res) =>{
    try {
        const {id} = req.params;
        const comentario = await Comentario.findById(id).populate([
            { 
                path: 'perfilUsuario', 
                model: 'PerfilUsuario',
                populate:{path:'usuario',model:'Usuario'}
             },
            { path: 'estadoAnimo', model: 'EstadosAnimo', select:'nombre' },
        ]);
        
        return res.status(200).json(comentario)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearComentario = async (req, res) => {
    try {
      const { titulo,texto,estadoAnimo } = req.body;
      const perfil = await getIdPerfilByIdUser(req.uid);
      if(!perfil) return res.status(401).json({ok:false,msg:'No puedes comentar si no tienes un perfil'})

      const comentarioData = {
          titulo,
          perfilUsuario :perfil._id,
          texto         :texto || '',
          numeroLikes   :0,
          numeroDislikes:0,
          estadoAnimo
      }
      const comentario = new Comentario(comentarioData);
      await comentario.save();
        //TODO Agregar comentario al negocio

      return res.status(201).json({
        ok: true,
        msg:"Comentario agregado",
        comentario
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
};
const modComentario= async (req,res) => {
    try {
        const { titulo,estadoAnimo, ...data } = req.body;
        const {id} = req.params

        const userAdmin = await verifyUserAdmin(req)
        const isAutor = await isAutorComentario(req,id)
        if( !(isAutor || userAdmin) ) 
            return res.status(401).json({ok:false,msg:'Solo el autor o un administrador puede borrar el comentario'})
        const comentarioData = {
          titulo,
          texto         :data.texto || '',
          estadoAnimo
        }
        const comentario = await Comentario.findByIdAndUpdate(id,{...comentarioData},{new:true})
        return res.status(201).json({
            ok: true,
            msg:"Comentario modificado",
            comentario
          });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const deleteComentario = async(req,res) =>{
    try {
        const {id} = req.params
        const userAdmin = await verifyUserAdmin(req)
        const isAutor = await isAutorComentario(req,id)
        if( !(isAutor || userAdmin) ) 
            return res.status(401).json({ok:false,msg:'Solo el autor o un administrador puede borrar el comentario'})
        const comentario = await Comentario.findByIdAndDelete(id);
        comentario.save();
        return res.status(201).json({
            ok: true,
            msg:"Comentario Eliminado",
            comentario
          });    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
module.exports = {
    getAllComentarios,
    getComentariosPaginate,
    getComentarioById,
    crearComentario,
    modComentario,
    deleteComentario,
}