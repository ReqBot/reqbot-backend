'use strict';
var dbConn = require('../../../database/db.config');

//logs object create
var Logs = function (logs) {
    this.nombre = logs.nombre;
    this.ruta = logs.ruta;
    this.idProyecto = logs.idProyecto;
};

Logs.create = function (newlogs, result) {
    dbConn.query("INSERT INTO logs set ?", newlogs, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Logs.findById = function (id, result) {
    dbConn.query("Select * from logs where idLogs = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Logs.findAll = function (result) {
    dbConn.query("Select * from logs", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('logs : ', res);
            result(null, res);
        }
    });
};

Logs.update = function (id, logs, result) {
    dbConn.query("UPDATE logs SET nombre=?,ruta=?,idProyecto=? WHERE idLogs = ?",
        [   logs.nombre,
            logs.ruta,
            logs.idProyecto,
            id
        ],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Logs.delete = function (id, result) {
    dbConn.query("DELETE FROM logs WHERE idLogs = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Logs;