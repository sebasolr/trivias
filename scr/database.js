const mysql = require('mysql');
const { promisify } =require('util')
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCO;_CONNECTION_LOST') {
            console.log('DATABASE CONNECTIONS WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('DATABASE connection WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DATABASE is CONNECTED');
    return;
});
// me permite hacer promesas lo que antes era callback
pool.query = promisify(pool.query);
module.exports = pool;