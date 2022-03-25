const Direccion = require('../models/direcciones');

const getAllDirecciones = async (req, res) => {
    try {
      const direcciones = await Direccion.find()
  
      return res.status(200).json({
        ok: true,
        direcciones,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getDireccionesPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,        
      };
  
      const direcciones = await Direccion.paginate({}, options);
  
      return res.status(200).json(direcciones);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getDireccionById = async (req, res) =>{
    try {
        const {id} = req.params;
        const direccion = await Direccion.findById(id);
        
        return res.status(200).json(direccion)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearDireccion = async (req, res) => {
    try {
      const { ...data } = req.body;
        console.log(data)
      const direccion = new Direccion( data );
      await direccion.save();
  
      return res.status(201).json({
        ok: true,
        msg:"Agregado correctamente",
        direccion
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
const modDireccion = async(req,res) =>{
    try {
        const {...data} = req.body;
        const {id} = req.params;

        const direccion = await Direccion.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Direccion actualizada con exito',
            direccion
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deleteDireccion = async(req,res) =>{
    try {
        const {id} = req.params;

        const direccion = await Direccion.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Direccion borrada con exito',
            direccion
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
module.exports = {
    getAllDirecciones,
    getDireccionesPaginate,
    getDireccionById,
    crearDireccion,
    modDireccion,
    deleteDireccion,
}