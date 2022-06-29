const { verifyNegocioByIdUser } = require("../helpers/verifyNegocio");
const { verifyUserAdmin } = require("../helpers/verifyUsers");

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
const getNegocioByIdUser = async(req,res) =>{
  try {
      const { id } = req.params;
      const negocios = await Negocio.findOne({usuario:id}).populate([
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
                msg:'Este usuario ya tiene un negocio asociado'
            })
        }
        const negocioData = {
            usuario: req.usuario._id,
            tipoNegocio: data.tipoNegocio,
            img: req?.file?.filename || 'defaultNegocio.png',
            nombre:data.nombre,
            estrellas: [],
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
    const { id } = req.params;
    const {...data} = req.body;

    const oldNegocio = await Negocio.findById(id);
    const userAdmin = await verifyUserAdmin(req)

    if(!(oldNegocio.usuario.equals(req.uid) || userAdmin)){
        if(req.file) deleteImg(req.file.filename)
        return res.status(401).json({
            ok:false,
            msg:'Usted no tiene permitido hacer esto >:c'
        })
    }
  
    if(oldNegocio.img != 'defaultNegocio.png') deleteImg(oldProducto.img)
    data.img = 'defaultNegocio.png'
    if(req.file){
        data.img = req.file.filename;
    }
    
    const negocioData = {
      usuario: req.usuario._id,
      tipoNegocio: data.tipoNegocio || oldNegocio.tipoNegocio,
      img: req.img || 'defaultNegocio.png',
      nombre:data.nombre || oldNegocio.nombre,
      telefono: data.telefono || oldNegocio.telefono,
      correo: data.correo || oldNegocio.correo,
      descripcion: data.descripcion || oldNegocio.descripcion
  }
    const negocio = await Producto.findByIdAndUpdate(id,{...negocioData},{new:true});
    await negocio.save();

    return res.status(201).json({
        ok:true,
        msg:'Negocio Modificado',
        negocio
    })
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
const verifyNegocio = async(req,res) =>{
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
    getNegocioByIdUser,
    getNegociosByNamePaginate,
    crearNegocio,
    actualizarnegocio,
}