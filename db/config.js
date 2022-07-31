const mysql = require("mysql");
const util = require("util");
const connection = mysql.createPool({
  host: process.env.db_host,
  database: process.env.db_name,
  user: process.env.db_user,
  password: process.env.db_pass,
});
connection.getConnection((err) => {
  err
    ? console.log("No conectado", { Error: err.message })
    : console.log("Conexion establecida..");
});
connection.query = util.promisify(connection.query);
module.exports = connection;
