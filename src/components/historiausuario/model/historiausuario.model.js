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
    this.identificador = historiausuario.identificador;
    this.version = historiausuario.version;
    this.prioridad = historiausuario.prioridad;
    this.puntaje = historiausuario.puntaje;
};

HistoriaUsuario.create = function (newhistoriausuario, result) {
    dbConn.query("select * from historiausuario where version=? and identificador=?", [newhistoriausuario.version,newhistoriausuario.identificador], function (err, res) {
        console.log("asd: ", res);
        if(res.length != 0 ){
            console.log("error: ", err);
            result(null, "Error");
        }else{
            console.log("Entro: ", "Gaa");
            dbConn.query("INSERT INTO historiausuario set ?", newhistoriausuario, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
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
/*
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
*/
HistoriaUsuario.findAll = function (result) {
    dbConn.query('SELECT * FROM historiausuario WHERE version IN (SELECT MAX(version) FROM historiausuario GROUP BY identificador) ', function (err, res) {
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

HistoriaUsuario.findByProyectoPendientes = function (id, result) {
    dbConn.query('Select * from historiausuario where estado="Pendiente" and idProyecto=?', id, function (err, res) {
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

HistoriaUsuario.findByProyectoAprobados = function (id, result) {
    dbConn.query('Select * from historiausuario where estado="Aprobado" and idProyecto=?', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.findByIdentifier = function (id, result) {
    dbConn.query('Select * from historiausuario where identificador = ?', id, function (err, res) {
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
    dbConn.query("UPDATE historiausuario SET nombre=?,rol=?,funcionalidad=?,resultado=?,fechaModificacion=?,modificadoPor=?, \n\
    idProyecto=?, estado=?, identificador=?, version=?, prioridad=?, puntaje=?  WHERE idHistoriaUsuario = ?",
        [
            historiausuario.nombre,
            historiausuario.rol,
            historiausuario.funcionalidad,
            historiausuario.resultado,
            historiausuario.fechaModificacion,
            historiausuario.modificadoPor,
            historiausuario.idProyecto,
            historiausuario.estado,
            historiausuario.identificador,
            historiausuario.version,
            historiausuario.prioridad,
            historiausuario.puntaje,
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

HistoriaUsuario.changeStateToInactive = function (id, result) {
    dbConn.query("UPDATE `bdreqbot`.`historiausuario` SET `estado` = 'Inactivo' WHERE (`idHistoriaUsuario` = ?);",[id], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null,err)
        }else {
            result(null,res)
        }
    })
};

HistoriaUsuario.orderByMedia = function (result) {
    dbConn.query('Select * from historiausuario where prioridad="Media"', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.orderByBajo = function (result) {
    dbConn.query('Select * from historiausuario where prioridad="Bajo"', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.orderByAlta = function (result) {
    dbConn.query('Select * from historiausuario where prioridad="Alta"', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.getMaxIdentifier = function (result) {
    dbConn.query('SELECT MAX(identificador) as identificador FROM bdreqbot.historiausuario', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};


module.exports = HistoriaUsuario;