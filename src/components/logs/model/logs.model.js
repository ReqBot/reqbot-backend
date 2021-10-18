'use strict';
var dbConn = require('../../../database/db.config');

//logs object create
var Logs = function (logs) {
    this.nombre = logs.nombre;
    this.archivo = logs.archivo;
    this.idProyecto = logs.idProyecto;
    this.estado = logs.estado;
    this.fecha = new Date(logs.fecha);
    this.nombreProyecto = logs.nombreProyecto;
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
    dbConn.query("Select * from logs where estado!='Eliminado'", function (err, res) {
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
    dbConn.query("UPDATE logs SET nombre=?,ruta=?,idProyecto=?, estado=? WHERE idLogs = ? ",
        [   logs.nombre,
            logs.ruta,
            logs.idProyecto,
            logs.estado,
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
    dbConn.query("DELETE FROM logs WHERE idLogs = ? ", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Logs.findByOrganizacion = function (id, result) {
    dbConn.query('SELECT logs.idLogs, \n\
     logs.nombre, \n\
     logs.archivo, \n\
     logs.idProyecto, \n\
     logs.estado, \n\
     logs.fecha,  \n\
     logs.nombreProyecto \n\
    FROM logs inner join proyecto on proyecto.idProyecto=logs.idProyecto where proyecto.idOrganizacion=?  and  estado!="Eliminado" ', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('logs : ', res);
            result(null, res);
        }
    });
};

Logs.orderByAsc = function (id, result) {
    dbConn.query('select logs.idLogs, \n\
    logs.nombre,logs.archivo,logs.idProyecto,logs.estado,logs.fecha,logs.nombreProyecto from logs \n\
    inner join proyecto on proyecto.idProyecto=logs.idProyecto \n\
    where proyecto.idOrganizacion=?  and  estado!="Eliminado" \n\
    order by logs.fecha ASC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('logs : ', res);
            result(null, res);
        }
    });
};


Logs.orderByDesc = function (id, result) {
    dbConn.query('select logs.idLogs, \n\
    logs.nombre,logs.archivo,logs.idProyecto,logs.estado,logs.fecha,logs.nombreProyecto from logs \n\
    inner join proyecto on proyecto.idProyecto=logs.idProyecto \n\
    where proyecto.idOrganizacion=?  and  estado!="Eliminado" \n\
    order by logs.fecha DESC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('logs : ', res);
            result(null, res);
        }
    });
};

Logs.changeStateToDelete = function (id, result) {
    dbConn.query("UPDATE `logs` SET `estado` = 'Eliminado' WHERE (`idLogs` = ?);",[id], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null,err)
        }else {
            result(null,res)
        }
    })
}


module.exports = Logs;