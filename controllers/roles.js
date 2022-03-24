

const Rol = require('../models/roles');
const { verifyUserRol } = require("../helpers/verifyUsers");


const getRoles = async(req,res) =>{
    try {
        if(await verifyUserRol(req,res,'admin')) return false;

        const roles = await Rol.find();

        return res.status(200).json(roles)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Error Interno del servidor"
        })
    }
}

module.exports = {
    getRoles
}