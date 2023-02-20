"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//RUTAS
const indexRoutes_1 = __importDefault(require("./rutas/indexRoutes"));
/* CRUD */
const paisRoutes_1 = __importDefault(require("./rutas/paisRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.rutas();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //puede ser leidos por un json
        this.app.use(express_1.default.urlencoded({ extended: false })); //para tener mejor comunicacion con archivos HTML
    }
    rutas() {
        this.app.use(indexRoutes_1.default);
        /* PAIS / NACIONALIDAD */
        this.app.use('/app/pais', paisRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
