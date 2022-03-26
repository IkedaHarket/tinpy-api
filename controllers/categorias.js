/*
    Categoria Producto Controller
*/
const CategoriaProducto = require('../models/categorias');

const getAllCategorias = async (req, res) => {
    try {
      const categorias = await CategoriaProducto.find()
  
      return res.status(200).json({
        ok: true,
        categorias,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getCategoriasPaginate = async (req, res) => {
    try {
      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,        
      };
  
      const categorias = await CategoriaProducto.paginate({}, options);
  
      return res.status(200).json(categorias);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error interno del servidor",
      });
    }
  };
const getCategoriaById = async (req, res) =>{
    try {
        const {id} = req.params;
        const categoria = await CategoriaProducto.findById(id);
        
        return res.status(200).json(categoria)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const crearCategorias = async (req, res) => {
    try {
      const { ...data } = req.body;
    
      const categoria = new CategoriaProducto(data);
      await categoria.save();
  
      return res.status(201).json({
        ok: true,
        msg:"Agregada correctamente",
        categoria
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  };
const modCategoria = async(req,res) =>{
    try {
        const {...data} = req.body;
        const {id} = req.params;

        const categoria = await CategoriaProducto.findByIdAndUpdate(id,{...data},{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Categoria actualizada con exito',
            categoria
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
const deleteCategoria = async(req,res) =>{
    try {
        const {id} = req.params;

        const categoria = await CategoriaProducto.findByIdAndDelete(id,{new:true});

        return res.status(200).json({
            ok:true,
            msg:'Categoria borrada con exito',
            categoria
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error interno del servidor"
        })
    }
}
module.exports = {
    getAllCategorias,
    getCategoriasPaginate,
    getCategoriaById,
    crearCategorias,
    modCategoria,
    deleteCategoria,
}