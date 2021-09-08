'use strict';
var dbConn = require('../../../database/db.config');

//usuarioProyecto object create
var UsuarioProyecto = function (usuarioProyecto) {
    this.idProyecto = usuarioProyecto.idProyecto;
    this.idUsuario = usuarioProyecto.idUsuario;
};

UsuarioProyecto.create = function (newusuarioProyecto, result) {
    dbConn.query("INSERT INTO usuarioproyecto set ?", newusuarioProyecto, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

/*
UsuarioProyecto.findById = function (id, result) {
    dbConn.query("Select * from usuarioproyecto where idusuarioProyecto = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};*/

UsuarioProyecto.findAll = function (result) {
    dbConn.query("Select * from usuarioproyecto", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('usuarioProyecto : ', res);
            result(null, res);
        }
    });
};

UsuarioProyecto.update = function (id, usuarioProyecto, result) {
    dbConn.query("UPDATE usuarioproyecto SET idUsuario=? WHERE idProyecto = ?",
        [   usuarioProyecto.idProyecto,
            usuarioProyecto.idUsuario,
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

UsuarioProyecto.delete = function (id, result) {
    dbConn.query("DELETE FROM usuarioproyecto WHERE idProyecto = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = UsuarioProyecto;