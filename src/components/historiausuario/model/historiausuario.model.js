'use strict';
var dbConn = require('../../../database/db.config');

//historiausuario object create
var HistoriaUsuario = function (historiausuario) {
    this.nombre = historiausuario.nombre;
    this.rol = historiausuario.rol;
    this.funcionalidad = historiausuario.funcionalidad;
    this.resultado = historiausuario.resultado;
    this.fechaModificacion = new Date(historiausuario.fechaModificacion);
    this.modificadoPor = historiausuario.modificadoPor;
    this.idProyecto = historiausuario.idProyecto;
    this.estado = historiausuario.estado;
};

HistoriaUsuario.create = function (newhistoriausuario, result) {
    dbConn.query("INSERT INTO historiausuario set ?", newhistoriausuario, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


HistoriaUsuario.findById = function (id, result) {
    dbConn.query("Select * from historiausuario where idHistoriaUsuario = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

HistoriaUsuario.findAll = function (result) {
    dbConn.query('Select * from historiausuario', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.findByPendientes = function (result) {
    dbConn.query('Select * from historiausuario where estado="Pendiente"', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.findByAprobados = function (result) {
    dbConn.query('Select * from historiausuario where estado="Aprobado"', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.update = function (id, historiausuario, result) {
    dbConn.query("UPDATE historiausuario SET nombre=?,rol=?,funcionalidad=?,resultado=?,fechaModificacion=?,modificadoPor=?,idProyecto=?, estado=? WHERE idHistoriaUsuario = ?",
        [   historiausuario.nombre,
            historiausuario.rol,
            historiausuario.funcionalidad,
            historiausuario.resultado,
            historiausuario.fechaModificacion,
            historiausuario.modificadoPor,
            historiausuario.idProyecto,
            historiausuario.estado,
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

HistoriaUsuario.delete = function (id, result) {
    dbConn.query("DELETE FROM historiausuario WHERE idHistoriaUsuario = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = HistoriaUsuario;