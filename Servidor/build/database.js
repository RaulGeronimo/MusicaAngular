"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const data_1 = __importDefault(require("./data"));
const pool = promise_mysql_1.default.createPool(data_1.default.database);
pool.getConnection() //instalar promise-mysql@3.3.1 si sale error en el getConnection
    .then((connection) => {
    pool.releaseConnection(connection);
    pool.query('SET lc_time_names = \'es_MX\'');
    console.log('Conexion exitosa');
});
exports.default = pool;
