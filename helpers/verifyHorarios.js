const Horarios = require('../models/horarios')

const verifyHorarioById = async(id) =>{
    const horario = await Horarios.findById(id);
    if(!horario){
        throw new Error(`El id ${id} no existe`);
    }
}
const verifyHorarioByIdNegocio = async(negocio)=>{
    const existeHorarioNegocio = await Horarios.findOne({negocio});
    if(existeHorarioNegocio) return true;
    return false;
}
const verifyHorarioByIdNegocioMiddleware = async(negocio)=>{
    const existeHorarioNegocio = await Horarios.findOne({negocio});
    if(!existeHorarioNegocio) throw new Error(`El id ${id} no existe`);
}
module.exports = {
    verifyHorarioById,
    verifyHorarioByIdNegocio,
    verifyHorarioByIdNegocioMiddleware,
}