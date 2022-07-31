const mysql = require("mysql");
const util = require("util");
//DB CONNECITON MYSQL WORKBENCH
const db = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  database: process.env.db_name,
});

db.getConnection((err, connection) => {
  if (err)
    console.warn("Unable to connect to database", { Error: err.message });
  else {
    console.dir("Connection to database established 🚀 ...");
    db.releaseConnection(connection);
  }
});

db.query = util.promisify(db.query);

module.exports = db;
