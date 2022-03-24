const TipoNegocio = require('../models/tipoNegocio');

const getAllTipoNegocios = async (req, res) => {
    try {
      const tipoNegocios = await TipoNegocio.find()
  
      return res.status(200).json({
        ok: true,
        tipoNegocios,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getTipoNegociosPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,        
      };
  
      const tiposNegocios = await TipoNegocio.paginate({}, options);
  
      return res.status(200).json(tiposNegocios);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getTipoNegocioById = async (req, res) =>{
    try {
        const {id} = req.params;
        const tipoNegocio = await TipoNegocio.findById(id);
        
        return res.status(200).json(tipoNegocio)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearTipoNegocio = async (req, res) => {
    try {
      const { nombre } = req.body;
    
      const tipoNegocio = new TipoNegocio({ nombre });
      await tipoNegocio.save();
  
      return res.status(201).json({
        ok: true,
        msg:"Agregado correctamente",
        tipoNegocio
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
const modTipoNegocio = async(req,res) =>{
    try {
        const {...data} = req.body;
        const {id} = req.params;

        const tipoNegocio = await TipoNegocio.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Tipo de negocio actualizado con exito',
            tipoNegocio
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deleteTipoNegocio = async(req,res) =>{
    try {
        const {id} = req.params;

        const tipoNegocio = await TipoNegocio.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Tipo de negocio borrado con exito',
            tipoNegocio
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
module.exports = {
    getAllTipoNegocios,
    getTipoNegociosPaginate,
    getTipoNegocioById,
    crearTipoNegocio,
    modTipoNegocio,
    deleteTipoNegocio,
}