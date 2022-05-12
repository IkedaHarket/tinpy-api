const { getIdPerfilByIdUser } = require("../helpers/verifyPerfiles");
const { verifyPerfilUserHaveStar } = require("../helpers/verifyStars");
const Negocio = require("../models/negocio");
const Stars = require("../models/stars");

const addStarsByIdNegocio = async(req,res) => {
    try {
        const { idNegocio } = req.params;
        const { stars: starsByUser } = req.body
        const {_id:idPerfilUser} = await getIdPerfilByIdUser(req.uid);        

        const userHaveStar = await verifyPerfilUserHaveStar(idPerfilUser,idNegocio)

        if(userHaveStar.resp){

            const stars = await Stars.findByIdAndUpdate(userHaveStar.star._id,{numeroEstrellas:starsByUser});
            const negocio = await Negocio.findById(idNegocio).populate([
                { path: 'usuario',model: 'Usuario'},
                { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
                { path: 'direccion', model: 'Direccion' },
                { path: 'estrellas', model: 'StarsNegocio' },
            ]);
            
            res.json({
                negocio,
                stars
            });
        }else{
            const stars = new Stars({perfil:idPerfilUser,numeroEstrellas:starsByUser})
            await stars.save();
                
            const negocio = await Negocio.findByIdAndUpdate(idNegocio,
                {
                    $addToSet:{estrellas:stars._id},
                },
                {new:true}
                ).populate([
                    { path: 'usuario',model: 'Usuario'},
                    { path: 'tipoNegocio', model: 'TipoNegocio', select:'nombre' },
                    { path: 'direccion', model: 'Direccion' },
                    { path: 'estrellas', model: 'StarsNegocio' },
                ]);
            res.json({
                negocio,
                stars
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}

module.exports = {
    addStarsByIdNegocio,
}