const { getIdPerfilByIdUser } = require("../helpers/verifyPerfiles");
const { verifyPerfilUserHaveStar } = require("../helpers/verifyStars");
const Negocio = require("../models/negocio");
const Stars = require("../models/stars");

const addStarsByIdNegocio = async(req,res) => {
    try {
        const { idNegocio } = req.params;
        const { stars: starsByUser } = req.body
        const {_id:idPerfilUser} = await getIdPerfilByIdUser(req.uid);

        const negocioBeforeAddStars = await Negocio.findById(idNegocio);
        

        const userHaveStar = await verifyPerfilUserHaveStar(idPerfilUser,idNegocio)
        console.log(userHaveStar);
        if(userHaveStar.resp){
            res.json({
                'ok':false,
                'msg':'Pronto se podran editar las estrellas <3'
            });
        }else{
            const stars = new Stars({perfil:idPerfilUser,numeroEstrellas:starsByUser})
            await stars.save();
    
            const promedioEstrellas = (negocioBeforeAddStars.totalEstrellas+starsByUser)/(negocioBeforeAddStars.estrellas.length + 1) || starsByUser;
            
            const negocio = await Negocio.findByIdAndUpdate(idNegocio,
                {
                    $addToSet:{estrellas:stars._id},
                    $inc:{totalEstrellas:starsByUser},
                    promedioEstrellas
                },
                {new:true}
                );
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