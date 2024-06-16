var mysql = require("mysql2");

var debug = false;

if (debug) {
  var dbConn = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DATABASE_LOCAL_HOST,
    database: process.env.DATABASE_LOCAL_DATABASE,
    user: process.env.DATABASE_LOCAL_USER,
    password: process.env.DATABASE_LOCAL_PASSWORD,
  });
} else {
  var dbConn = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DATABASE_REMOTE_HOST,
    database: process.env.DATABASE_REMOTE_DATABASE,
    user: process.env.DATABASE_REMOTE_USER,
    password: process.env.DATABASE_REMOTE_PASSWORD,
  });
}

dbConn.getConnection(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

module.exports = dbConn;
