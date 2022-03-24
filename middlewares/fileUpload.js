
const multer = require('multer');
const shortid = require('shortid')

const multerConfigFunction = () =>{
    return multerConfig = {
        storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/'); // los uploads se subirán en esta carpeta
          },
          filename: (req, file, cb) => {
            // obtener la extensión del archivo
            const extension = file.mimetype.split('/')[1];
            // generar ID para ponerlo como nombre de imagen
            cb(null, `${shortid.generate()}.${extension}`);
          }
        }),
        fileFilter(req, file, cb) {
          if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' || file.mimetype === 'image/jpg' ) { // solo aceptar imágenes
            cb(null, true);
          } else {
            cb(new Error('Formato de imagen no válido'))
          }
        }
      }
}

const fileUpload = (req,res,next) =>{
    const upload = multer(multerConfigFunction()).single('img');
    upload(req,res,function(error){
        if(error) new Error('Error subir imagen')
        next();
    })
}

module.exports = {
    fileUpload
}
