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
            direcciones:      '/api/direcciones',
            categorias:       '/api/categorias',
            estadosAnimo:     '/api/estados-animo',
            horarios:         '/api/horarios',
            comentarios:      '/api/comentarios',
            productos:        '/api/productos',
            redes:            '/api/redes',
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
        this.app.use(this.paths.categorias,     require('../routes/categorias'));
        this.app.use(this.paths.estadosAnimo,   require('../routes/estadosAnimos'));
        this.app.use(this.paths.horarios,       require('../routes/horarios'));
        this.app.use(this.paths.comentarios,    require('../routes/comentarios'));
        this.app.use(this.paths.productos,      require('../routes/productos'));
        this.app.use(this.paths.redes,          require('../routes/redes'));
    }
    listen(){//Escucha
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto: '+this.port);
        })
    }
}

module.exports = Server;