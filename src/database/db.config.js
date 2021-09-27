var mysql = require('mysql');
/*
var db_config = {
  host: "us-cdbr-east-04.cleardb.com",
  database: "heroku_5b6792719729bc7",
  user: "b184d7b02f4177",
  password: "fdb5cb53"
};

var dbConn;

function handleDisconnect() {
  dbConn = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  dbConn.connect(function (err) { // The server is either down
    if (err) { // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  dbConn.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else { // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();*/


var dbConn = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  database: "heroku_5b6792719729bc7",
  user: "b184d7b02f4177",
  password: "fdb5cb53"
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

//dbConn.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = dbConn;