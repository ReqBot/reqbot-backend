'use strict';
var dbConn = require('../../../database/db.config');

//proyecto object create
var Proyecto = function (proyecto) {
    this.nombre = proyecto.nombre;
    this.fechaModificacion = new Date(proyecto.fechaModificacion);
    this.etiqueta = proyecto.etiqueta;
    this.estado = proyecto.estado;
    this.numeroDeHistorias = proyecto.numeroDeHistorias;
    this.numeroUsuarios = proyecto.numeroUsuarios;
    this.idOrganizacion = proyecto.idOrganizacion;
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

Proyecto.findByOrganizacion = function (id, result) {
    dbConn.query('Select * from proyecto where idOrganizacion = ? ',id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Proyecto : ', res);
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
    dbConn.query("UPDATE proyecto SET nombre=?,fechaModificacion=?,etiqueta=?,estado=?,numeroDeHistorias=?,numeroUsuarios=?,idOrganizacion=? WHERE idProyecto = ?",
        [   proyecto.nombre,
            proyecto.fechaModificacion,
            proyecto.etiqueta,
            proyecto.estado,
            proyecto.numeroDeHistorias,
            proyecto.numeroUsuarios,
            proyecto.idOrganizacion,
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
Proyecto.changeStateToInactive = function (id, result) {
    dbConn.query("UPDATE `bdreqbot`.`proyecto` SET `estado` = 'Inactivo' WHERE (`idProyecto` = ?);",[id], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null,err)
        }else {
            result(null,res)
        }
    })
}
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

Proyecto.orderByAsc = function (result) {
    dbConn.query('Select * from proyecto ORDER BY nombre ASC', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Proyecto : ', res);
            result(null, res);
        }
    });
};

Proyecto.orderByDesc = function (result) {
    dbConn.query('Select * from proyecto ORDER BY nombre DESC', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Proyecto : ', res);
            result(null, res);
        }
    });
};


module.exports = Proyecto;