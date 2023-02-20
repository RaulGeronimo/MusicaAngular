import express, { Application } from 'express';

import morgan from 'morgan';
import cors from 'cors';

//RUTAS
import indexRoutes from './rutas/indexRoutes';

/* CRUD */
import paisRoutes from './rutas/paisRoutes';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.rutas();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json()); //puede ser leidos por un json
        this.app.use(express.urlencoded({extended: false})); //para tener mejor comunicacion con archivos HTML
    }

    rutas(): void{
        this.app.use(indexRoutes);
        /* PAIS / NACIONALIDAD */
        this.app.use('/app/pais', paisRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en puerto', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();