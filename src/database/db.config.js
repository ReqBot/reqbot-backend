var mysql = require('mysql');

/*var dbConn = mysql.createPool({
  connectionLimit : 100, 
  host: "us-cdbr-east-04.cleardb.com",
  database: "heroku_5b6792719729bc7",
  user: "b184d7b02f4177",
  password: "fdb5cb53"
});*/


var dbConn = mysql.createPool({
  connectionLimit : 100, 
  host: "localhost",
  database: "bdreqbot",
  user: "root",
  password: "root"
})


dbConn.getConnection(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});


module.exports = dbConn;