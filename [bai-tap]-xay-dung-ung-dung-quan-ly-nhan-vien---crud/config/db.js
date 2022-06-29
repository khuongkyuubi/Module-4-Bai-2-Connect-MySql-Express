const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql123456',
    database: 'dbEmployee',
    charset: 'utf8_general_ci'

})

const query = util.promisify(connection.query).bind(connection);
const connect = util.promisify(connection.connect).bind(connection);

module.exports = {query,connect}