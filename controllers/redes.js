const { getNegocioByIdUser } = require('../helpers/verifyNegocio');
const { verifyUserAdmin } = require('../helpers/verifyUsers');
const Redes = require('../models/redes');

const getAllRedes = async (req, res) => {
    try {
      const redes = await Redes.find()
  
      return res.status(200).json({
        ok: true,
        redes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getRedesPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,        
      };
  
      const redes = await Redes.paginate({}, options);
  
      return res.status(200).json(redes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getRedById = async (req, res) =>{
    try {
        const {id} = req.params;
        const red = await Redes.findById(id);
        
        return res.status(200).json(red)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const getAllRedesByIdNegocio = async (req,res) => {
  try {
      const redes = await Redes.find({negocio: req.params.idNegocio});
  
      return res.status(200).json({
        ok: true,
        redes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
}
const getRedesByIdNegocioPaginate = async (req,res) => {
  try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
      };
      const redes = await Redes.paginate({negocio: req.params.idNegocio}, options);

      return res.status(200).json({
          ok:true,
          redes
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
}
const crearEnlace = async (req, res) => {
    try {
      const { nombre, enlace, color } = req.body;
    
      const negocio = await getNegocioByIdUser(req.usuario._id);
        if(!negocio) {
            return res.status(401).json({
                ok:false,
                msg:'No tienes un negocio vinculado a tu cuenta',
            })
        }

      const red = new Redes({ nombre, enlace, color, negocio:negocio._id });
      await red.save();
  
      return res.status(201).json({
        ok: true,
        msg:"Agregada correctamente",
        red
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
  const modEnlace = async(req,res) =>{
    try {
        const {nombre, enlace, color} = req.body;
        const {id} = req.params;

        const oldRed = await Redes.findById(id);
        const userAdmin = await verifyUserAdmin(req)
        const negocio = await getNegocioByIdUser(req.usuario._id);

        if(!(oldRed.negocio.equals(negocio._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }

        const red = await Redes.findByIdAndUpdate(id,{nombre, enlace, color},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Enlace actualizado con exito',
            red
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deleteRed = async(req,res) =>{
    try {
        const {id} = req.params;

        const oldRed = await Redes.findById(id);
        const userAdmin = await verifyUserAdmin(req)
        const negocio = await getNegocioByIdUser(req.usuario._id);

        if(!(oldRed.negocio.equals(negocio._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }

        const red = await Redes.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Enlace borrado con exito',
            red
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
  module.exports = {
    getAllRedes,
    getRedesPaginate,
    getRedById,
    getAllRedesByIdNegocio,
    getRedesByIdNegocioPaginate,
    crearEnlace,
    modEnlace,
    deleteRed,
  }