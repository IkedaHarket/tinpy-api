/*
    Categoria Producto Controller
*/
const { isAutorComentario, verifyPerfilLike, verifyPerfilDislike } = require('../helpers/verifyComentarios');
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
  
      return res.status(200).json({
          ok:true,
          comentarios
      });
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
};
const getAllComentariosByIdNegocio = async (req,res) => {
    try {
        const comentarios = await Comentario.find({negocio: req.params.idNegocio}).populate([
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
const getComentariosByIdNegocioPaginate = async (req,res) => {
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
        const comentarios = await Comentario.paginate({negocio: req.params.idNegocio}, options);
    
        return res.status(200).json({
            ok:true,
            comentarios
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Error interno del servidor",
        });
      }
}
const crearComentario = async (req, res) => {
    try {
      const { titulo,texto,estadoAnimo,negocio } = req.body;
      const perfil = await getIdPerfilByIdUser(req.uid);
      if(!perfil) return res.status(401).json({ok:false,msg:'No puedes comentar si no tienes un perfil'})

      const comentarioData = {
          titulo,
          negocio,
          perfilUsuario :perfil._id,
          texto         :texto || '',
          numeroLikes   :0,
          numeroDislikes:0,
          estadoAnimo
      }
      const comentario = new Comentario(comentarioData);
      await comentario.save();

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
const agregarLike = async (req,res) =>{
    try {
        const {id} = req.params;
        const perfil = await getIdPerfilByIdUser(req.usuario._id);
        if(!perfil) return res.status(401).json({
          ok:false,
          msg:'No tienes un perfil con el que dar like'
        })
        const perfilLike = await verifyPerfilLike(id,perfil._id)
        if(perfilLike) return res.status(200).json({ok:false,msg:'Ya diste like'});

        const comentario = await Comentario.findByIdAndUpdate(id,{$addToSet:{likes:perfil._id},$inc:{numeroLikes:1}},{new:true});
        comentario.save();

        return res.status(201).json({
            ok: true,
            msg:"Like Agregado",
            comentario
          });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const removeLike = async(req,res) => {
    try {
        const {id} = req.params;
        const perfil = await getIdPerfilByIdUser(req.uid);
        if(!perfil) return res.status(401).json({
          ok:false,
          msg:'No tienes un perfil con el que quitar like'
        })
        const perfilLike = await verifyPerfilLike(id,perfil._id)
        if(!perfilLike) return res.status(200).json({ok:false,msg:'No tienes un like en este comentario'});

        const comentario = await Comentario.findByIdAndUpdate(id,{$pull:{likes:perfil._id},$inc:{numeroLikes:-1}},{new:true})
        comentario.save();

        return res.status(201).json({
            ok: true,
            msg:"Like quitado",
            comentario
          });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const agregarDislike = async (req,res) =>{
    try {
        const {id} = req.params;
        const perfil = await getIdPerfilByIdUser(req.uid);
        if(!perfil) return res.status(401).json({
          ok:false,
          msg:'No tienes un perfil con el que dar dislike'
        })
        const perfilDislike = await verifyPerfilDislike(id,perfil._id)
        if(perfilDislike) return res.status(200).json({ok:false,msg:'Ya diste dislike'});

        const comentario = await Comentario.findByIdAndUpdate(id,{$addToSet:{dislikes:perfil._id},$inc:{numeroDislikes:1}},{new:true});
        comentario.save();

        return res.status(201).json({
            ok: true,
            msg:"Dislike Agregado",
            comentario
          });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const removeDislike = async(req,res) => {
    try {
        const {id} = req.params;
        const perfil = await getIdPerfilByIdUser(req.uid);
        if(!perfil) return res.status(401).json({
          ok:false,
          msg:'No tienes un perfil con el que quitar dislike'
        })
        const perfilDislike = await verifyPerfilDislike(id,perfil._id)
        if(!perfilDislike) return res.status(200).json({ok:false,msg:'No tienes un dislike en este comentario'});

        const comentario = await Comentario.findByIdAndUpdate(id,{$pull:{dislikes:perfil._id},$inc:{numeroDislikes:-1}},{new:true})
        comentario.save();
        
        return res.status(201).json({
            ok: true,
            msg:"Dislike quitado",
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
    getAllComentariosByIdNegocio,
    getComentariosByIdNegocioPaginate,
    crearComentario,
    modComentario,
    agregarLike,
    removeLike,
    agregarDislike,
    removeDislike,    
    deleteComentario,
}