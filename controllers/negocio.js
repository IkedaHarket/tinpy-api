const { verifyNegocioByIdUser } = require("../helpers/verifyNegocio");
const Negocio = require("../models/negocio");

 const getAllNegocios = async(req,res) =>{
    try {
        const negocios = await Negocio.find().populate([
            { path: 'usuario',model: 'Usuario'},
            { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
            { path: 'direccion', model: 'Direccion' },
            { path: 'horario', model: 'Horarios' },
            { path: 'redes', model: 'Redes' }, //TODO agregar negocio a modelo redes
        ]);
    
        return res.status(200).json({
          ok: true,
          negocios,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Error interno del servidor",
        });
      }
 }
 const getNegociosPaginate = async(req,res) =>{

 }
 const getNegocioById = async(req,res) =>{

 }

const crearNegocio = async(req,res) =>{
    try {
        const {...data} = req.body;

        if(await verifyNegocioByIdUser(req.usuario._id)){
            return res.status(200).json({
                ok:false,
                msg:'Este negocio ya tiene un usuario asociado'
            })
        }
        const negocioData = {
            usuario: req.usuario._id,
            tipoNegocio: data.tipoNegocio,
            img: req?.file?.filename || 'defaultNegocio.png',
            nombre:data.nombre,
            totalEstrellas: 0,
            estrellas: [],
            promedioEstrellas:0,
            // productos:[],
            direccion:null,
            estado:true,
            verificado:false,
            horario: null,
            telefono: data.telefono,
            correo: data.correo,
            descripcion: data.descripcion,
            redes: null
        }
        const negocio = new Negocio(negocioData)
        await negocio.save();
        return res.status(201).json({
            ok:true,
            msg:'Negocio Creado Correctamente',
            negocio,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}

module.exports = {
    getAllNegocios,
    getNegociosPaginate,
    getNegocioById,    
    crearNegocio,
}