/*
    Categoria Producto Controller
*/
const Horario = require('../models/horarios');

const getAllHorarios = async (req, res) => {
    try {
      const horarios = await Horario.find()
  
      return res.status(200).json({
        ok: true,
        horarios,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getHorariosPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,        
      };
  
      const horarios = await Horario.paginate({}, options);
  
      return res.status(200).json(horarios);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getHorarioById = async (req, res) =>{
    try {
        const {id} = req.params;
        const horarios = await Horario.findById(id);
        
        return res.status(200).json(horarios)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearHorario = async (req, res) => {
    try {
      const { ...data } = req.body;
    
      const horarios = new Horario(data);
      await horarios.save();
  
      return res.status(201).json({
        ok: true,
        msg:"Agregado correctamente",
        horarios
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
const modHorario = async(req,res) =>{
    try {
        const {...data} = req.body;
        const {id} = req.params;

        const horarios = await Horario.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Horario actualizado con exito',
            horarios
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deleteHorario = async(req,res) =>{
    try {
        const {id} = req.params;

        const horarios = await Horario.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Horario borrado con exito',
            horarios
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
module.exports = {
    getAllHorarios,
    getHorariosPaginate,
    getHorarioById,
    crearHorario,
    modHorario,
    deleteHorario,
}