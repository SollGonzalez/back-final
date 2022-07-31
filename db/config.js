// const mysql = require("mysql");
// const util = require("util");
// //DB CONNECITON MYSQL WORKBENCH
// const db = mysql.createPool({
//   host: process.env.db_host,
//   user: process.env.db_user,
//   database: process.env.db_name,
//   password: process.env.pass,
// });

// db.getConnection((err, connection) => {
//   if (err)
//     console.warn("Unable to connect to database", { Error: err.message });
//   else {
//     console.dir("Connection to database established");
//     db.releaseConnection(connection);
//   }
// });

// db.query = util.promisify(db.query);

// module.exports = db;

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
