const { validationResult } = require("express-validator");
const { deleteImg } = require("../helpers/deleteImg");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(req.file){
      if(req.file.filename != 'default.png' || req.file.filename != 'defaultProducto.png' || req.file.filename != 'defaultNegocio.png'){
        deleteImg(req.file.filename)
      }
    }
    return res.status(400).json({
      ok:false,
      errors
    });
  }
  next();
};
module.exports = {
    validarCampos
}
