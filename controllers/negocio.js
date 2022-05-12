const { verifyNegocioByIdUser } = require("../helpers/verifyNegocio");

const Negocio = require("../models/negocio");

const getAllNegocios = async(req,res) =>{
    try {
        const negocios = await Negocio.find().populate([
            { path: 'usuario',model: 'Usuario'},
            { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
            { path: 'direccion', model: 'Direccion' },
            { path: 'estrellas', model: 'StarsNegocio' },
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
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,     
            populate:[
                { path: 'usuario',model: 'Usuario'},
                { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
                { path: 'direccion', model: 'Direccion' },
                { path: 'estrellas', model: 'StarsNegocio' },
            ]   
          };
          const negocios = await Negocio.paginate({}, options);
    
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
const getNegocioById = async(req,res) =>{
    try {
        const { id } = req.params;
        const negocios = await Negocio.findById(id).populate([
            { path: 'usuario',model: 'Usuario'},
            { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
            { path: 'direccion', model: 'Direccion' },
            { path: 'estrellas', model: 'StarsNegocio' },
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
const getNegociosByNamePaginate = async(req,res) =>{
  try {
    const { name } = req.params;

    const options = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,     
      populate:[
          { path: 'usuario',model: 'Usuario'},
          { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
          { path: 'direccion', model: 'Direccion' },
          { path: 'estrellas', model: 'StarsNegocio' },
      ]   
    };

    const negocios = await Negocio.paginate({nombre:{'$regex' : name, '$options' : 'i'}},options)

    res.json({negocios})
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
  }
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
            direccion:null,
            estado:true,
            verificado:false,
            telefono: data.telefono || '',
            correo: data.correo || '',
            descripcion: data.descripcion || ''
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
const actualizarnegocio = async(req,res) =>{
  try {
      
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
  }
}
const stateNegocio = async(req,res) =>{
  try {
      
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
  }
}
const deleteNegocio = async(req,res) =>{
  try {
      
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
  }
}
module.exports = {
    getAllNegocios,
    getNegociosPaginate,
    getNegocioById,    
    getNegociosByNamePaginate,
    crearNegocio,
}