'use strict';
var dbConn = require('../../../database/db.config');

//proyecto object create
var Proyecto = function (proyecto) {
    this.nombre = proyecto.nombre;
    this.siglas = proyecto.siglas;
    this.descripcion = proyecto.descripcion;
    this.imagen = proyecto.imagen;
    this.colorPrimario = proyecto.colorPrimario;
    this.colorSecundario = proyecto.colorSecundario;
    this.idPlan = proyecto.idPlan;
};

Proyecto.create = function (newproyecto, result) {
    dbConn.query("INSERT INTO proyecto set ?", newproyecto, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Proyecto.findById = function (id, result) {
    dbConn.query("Select * from proyecto where idProyecto = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Proyecto.findAll = function (result) {
    dbConn.query("Select * from proyecto", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Proyecto : ', res);
            result(null, res);
        }
    });
};

Proyecto.update = function (id, proyecto, result) {
    dbConn.query("UPDATE proyecto SET nombre=?,fechaModificacion=?,etiqueta=?,estado=?,numeroDeHistorias=?,colorSecundario=?,idPlan=? WHERE idproyecto = ?",
        [   proyecto.nombre,
            proyecto.siglas,
            proyecto.descripcion,
            proyecto.imagen,
            proyecto.colorPrimario,
            proyecto.colorSecundario,
            proyecto.idPlan,
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

Proyecto.delete = function (id, result) {
    dbConn.query("DELETE FROM proyecto WHERE idProyecto = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Proyecto;