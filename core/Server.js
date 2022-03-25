const express = require('express');
const cors    = require('cors');

const { dbConnection } = require('../database/dbConnection');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:             '/api/auth',
            usuarios:         '/api/users',
            roles:            '/api/roles',
            perfilUsuario:    '/api/perfiles',
            tipoNegocios:     '/api/tipos-negocios',
            direcciones:     '/api/direcciones',
          };
        
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(express.urlencoded({ extended: false }))
        //Cors
        this.app.use(cors());
        //Parsear el body
        this.app.use(express.json());
        //Levantar directorio publico
        this.app.use(express.static('public'))
        this.app.use(express.static('uploads'))
    }
    routes(){
        this.app.use(this.paths.roles,          require('../routes/roles'));
        this.app.use(this.paths.auth,           require('../routes/auth'));
        this.app.use(this.paths.usuarios,       require('../routes/usuarios'));
        this.app.use(this.paths.perfilUsuario,  require('../routes/perfilUsuario'));
        this.app.use(this.paths.tipoNegocios,   require('../routes/tipoNegocios'));
        this.app.use(this.paths.direcciones,    require('../routes/direcciones'));
    }
    listen(){//Escucha
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port);
        })
    }
}

module.exports = Server;