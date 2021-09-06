'use strict';
var dbConn = require('../../../database/db.config');

//Organizacion object create
var Organizacion = function (organizacion) {
    this.nombre = organizacion.nombre;
    this.siglas = organizacion.siglas;
    this.descripcion = organizacion.descripcion;
    this.imagen = organizacion.imagen;
    this.colorPrimario = organizacion.colorPrimario;
    this.colorSecundario = organizacion.colorSecundario;
    this.idPlan = organizacion.idPlan;
};

Organizacion.create = function (newOrganizacion, result) {
    dbConn.query("INSERT INTO organizacion set ?", newOrganizacion, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Organizacion.findById = function (id, result) {
    dbConn.query("Select * from organizacion where idOrganizacion = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Organizacion.findAll = function (result) {
    dbConn.query("Select * from organizacion", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('organizacion : ', res);
            result(null, res);
        }
    });
};

Organizacion.update = function (id, organizacion, result) {
    dbConn.query("UPDATE organizacion SET nombre=?,siglas=?,descripcion=?,imagen=?,colorPrimario=?,colorSecundario=?,idPlan=? WHERE idOrganizacion = ?",
        [   organizacion.nombre,
            organizacion.siglas,
            organizacion.descripcion,
            organizacion.imagen,
            organizacion.colorPrimario,
            organizacion.colorSecundario,
            organizacion.idPlan,
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

Organizacion.delete = function (id, result) {
    dbConn.query("DELETE FROM organizacion WHERE idOrganizacion = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Organizacion;