/*
    Estados Animos Controller
*/
const EstadosAnimo = require('../models/estadosAnimos');

const getAllEstadosAnimos = async (req, res) => {
    try {
      const estadosAnimo = await EstadosAnimo.find()
  
      return res.status(200).json({
        ok: true,
        estadosAnimo,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getEstadosAnimosPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,        
      };
  
      const estadosAnimo = await EstadosAnimo.paginate({}, options);
  
      return res.status(200).json(estadosAnimo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getEstadoAnimoById = async (req, res) =>{
    try {
        const {id} = req.params;
        const estadoAnimo = await EstadosAnimo.findById(id);
        
        return res.status(200).json(estadoAnimo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearEstadoAnimo = async (req, res) => {
    try {
      const { ...data } = req.body;
    
      const estadoAnimo = new EstadosAnimo(data);
      await estadoAnimo.save();
  
      return res.status(201).json({
        ok: true,
        msg:"Agregado correctamente",
        estadoAnimo
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
const modEstadoAnimo = async(req,res) =>{
    try {
        const {...data} = req.body;
        const {id} = req.params;

        const estadoAnimo = await EstadosAnimo.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Estado de animo actualizado con exito',
            estadoAnimo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deleteEstadoAnimo = async(req,res) =>{
    try {
        const {id} = req.params;

        const estadoAnimo = await EstadosAnimo.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Estado de animo borrado con exito',
            estadoAnimo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
module.exports = {
    getAllEstadosAnimos,
    getEstadosAnimosPaginate,
    getEstadoAnimoById,
    crearEstadoAnimo,
    modEstadoAnimo,
    deleteEstadoAnimo,
}