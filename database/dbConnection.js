/*
    Conexion a la base de datos
*/

const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION);

        console.log('Base de datos online');

    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
}

module.exports = {
    dbConnection
}