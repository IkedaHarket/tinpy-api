
const Producto = require('../models/productos')
const { verifyCategoriaById } = require('../helpers/verifyCategorias');
const { verifyUserAdmin } = require('../helpers/verifyUsers');
const { deleteImg } = require('../helpers/deleteImg');
const { verifyUsuarioLikeProducto } = require('../helpers/verifyProductos');

const getAllProductos = async(req,res) =>{
    try {

        const productos = await Producto.find({estado:true}).populate([
            { path: 'usuarioAutor', model: 'Usuario' },
            { path: 'categoria', model: 'CategoriaProducto',select:'nombre' },
        ]);

        return res.status(200).json(productos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
};
const getProductosPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        populate:[
            { path: 'usuarioAutor', model: 'Usuario' },
            { path: 'categoria', model: 'CategoriaProducto',select:'nombre' },
        ]
        
      };
  
      const productos = await Producto.paginate({}, options);
  
      return res.status(200).json(productos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getProductoById = async (req, res) =>{
    try {
        const {id} = req.params;
        const producto = await Producto.findById(id).populate([
            { path: 'usuarioAutor', model: 'Usuario' },
            { path: 'categoria', model: 'CategoriaProducto',select:'nombre' },
      ]); 
        
        return res.status(200).json(producto)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const addLikeProducto = async(req,res) =>{
    try {
        const {id} = req.params;

        const usuarioLike = await verifyUsuarioLikeProducto(id,req.usuario._id)
        if(usuarioLike) return res.status(200).json({ok:false,msg:'Ya diste like'});

        const producto = await Producto.findByIdAndUpdate(id,{$addToSet:{likes:req.usuario._id},$inc:{numeroLikes:1}},{new:true});
        producto.save();

        return res.status(201).json({
            ok: true,
            msg:"Like Agregado",
            producto,
          });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const removeLikeProducto = async(req,res) => {
    try {
        const {id} = req.params;

        const usuarioLike = await verifyUsuarioLikeProducto(id,req.usuario._id)
        if(!usuarioLike) return res.status(200).json({ok:false,msg:'No tienes un like en este producto'});

        const producto = await Producto.findByIdAndUpdate(id,{$pull:{likes:req.usuario._id},$inc:{numeroLikes:-1}},{new:true})
        producto.save();

        return res.status(201).json({
            ok: true,
            msg:"Like quitado",
            producto
          });  
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const crearProducto = async(req,res) =>{
    try {
        const {...data} = req.body;

        data.imagenPrincipal = 'defaultProducto.png'
        if(req.file){
            data.imagenPrincipal = req.file.filename;
        }
        try {
           data.precio = parseInt(data.precio)
        } catch (error) {
            return res.status(400).json({ok:false,msg:'El precio no es valido'});
        }
        if(data.categoria){
            try {
                await verifyCategoriaById(data.categoria);
            } catch (error) {
                return res.status(404).json({ok:false,msg:'Esta categoria no existe'});
            }
        }

        const productoData = {
            usuarioAutor: req.usuario._id,
            nombre: data.nombre || 'Producto genérico',
            precio: data.precio || 0,
            imagenPrincipal:data.imagenPrincipal,
            descripcion:data.descripcion || '',
            numeroLikes:0,
            likes: [],
            estado:true,
            categoria:data.categoria || '',
        }
        const producto = new Producto({...productoData});
        await producto.save();

        return res.status(201).json({
            ok:true,
            msg:'Producto Agregado',
            producto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const modProducto = async(req,res) =>{
    try {
        const { id } = req.params;
        const {...data} = req.body;
        const oldProducto = await Producto.findById(id);
        const userAdmin = await verifyUserAdmin(req)
        if(!(oldProducto.usuarioAutor.equals(req.usuario._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }
        if(oldProducto.imagenPrincipal != 'defaultProducto.png') deleteImg(oldProducto.imagenPrincipal)
        data.imagenPrincipal = 'defaultProducto.png'
        if(req.file){
            data.imagenPrincipal = req.file.filename;
        }
        const productoData = {
            usuarioAutor: req.usuario._id,
            nombre: data.nombre || 'Producto genérico',
            precio: data.precio || 0,
            imagenPrincipal:data.imagenPrincipal,
            descripcion:data.descripcion || '',
            numeroLikes:oldProducto.numeroLikes,
            likes: oldProducto.likes,
            estado:data.estado,
            categoria:(data.categoria)?data.categoria : oldProducto.categoria || '',
        }
        const producto = await Producto.findByIdAndUpdate(id,{...productoData},{new:true});
        await producto.save();

        return res.status(201).json({
            ok:true,
            msg:'Producto Modificado',
            producto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const modEstadoProduto = async(req,res) => {
    try {
        const { id } = req.params;

        const oldProducto = await Producto.findById(id);
        const userAdmin = await verifyUserAdmin(req)
        if(!(oldProducto.usuarioAutor.equals(req.usuario._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }
        if(oldProducto.imagenPrincipal != 'defaultProducto.png') deleteImg(oldProducto.imagenPrincipal)

        const producto = await Producto.findByIdAndUpdate(id,{estado:!oldProducto.estado ,imagenPrincipal:'defaultProducto.png'},{new:true})

        return res.status(201).json({
            ok:true,
            msg:'Estado Producto Modificado',
            producto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}
const deleteProducto = async(req,res) =>{
    try {
        const { id } = req.params;
        const oldProducto = await Producto.findById(id);
        const userAdmin = await verifyUserAdmin(req)
        if(!(oldProducto.usuarioAutor.equals(req.usuario._id) || userAdmin)){
            return res.status(401).json({
                ok:false,
                msg:'Usted no tiene permitido hacer esto >:c'
            })
        }
        if(oldProducto.imagenPrincipal != 'defaultProducto.png') deleteImg(oldProducto.imagenPrincipal)

        const producto = await Producto.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Producto borrado con exito',
            producto
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}

module.exports = {
    getAllProductos,
    getProductosPaginate,
    getProductoById,
    addLikeProducto,
    removeLikeProducto,
    crearProducto,
    modProducto,
    modEstadoProduto,
    deleteProducto,
}