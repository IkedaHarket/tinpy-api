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

const crearEnlace = async (req, res) => {
    try {
      const { nombre, enlace, color } = req.body;
    
      const red = new Redes({ nombre, enlace, color });
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
        const {...data} = req.body;
        const {id} = req.params;

        const red = await Redes.findByIdAndUpdate(id,{...data},{new:true});

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
    crearEnlace,
    modEnlace,
    deleteRed,
  }