'use strict';
var dbConn = require('../../../database/db.config');

//Plan object create
var Plan = function (plan) {
    this.nombre = plan.nombre;
    this.descripcion = plan.descripcion;
    this.costo = plan.costo;
    this.fechaCaducidad = new Date();
};

Plan.create = function (newPlan, result) {
    dbConn.query("INSERT INTO plan set ?", newPlan, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Plan.findById = function (id, result) {
    dbConn.query("Select * from plan where idPlan = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Plan.findAll = function (result) {
    dbConn.query("Select * from plan", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('plan : ', res);
            result(null, res);
        }
    });
};

Plan.update = function (id, plan, result) {
    dbConn.query("UPDATE plan SET nombre=?,descripcion=?,costo=?,fechaCaducidad=? WHERE idPlan = ?", [plan.nombre, plan.descripcion, plan.costo, plan.fechaCaducidad, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Plan.delete = function (id, result) {
    dbConn.query("DELETE FROM plan WHERE idPlan = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Plan;