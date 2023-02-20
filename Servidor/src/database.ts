import mysql from 'promise-mysql';
import data from './data';

const pool  = mysql.createPool(data.database);
pool.getConnection() //instalar promise-mysql@3.3.1 si sale error en el getConnection
.then((connection: any ) =>{
    pool.releaseConnection(connection);
    pool.query('SET lc_time_names = \'es_MX\'');
    console.log('Conexion exitosa');
});

export default pool;