const Horarios = require('../models/horarios')

const verifyHorarioById = async(id) =>{
    const horario = await Horarios.findById(id);
    if(!horario){
        throw new Error(`El id ${id} no existe`);
    }
}
module.exports = {
    verifyHorarioById
}