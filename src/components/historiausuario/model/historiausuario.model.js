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
    dbConn.query("Select * from historiausuario where idHistoriaUsuario = ? and estado!='Eliminado' ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

HistoriaUsuario.findAll = function (result) {
    dbConn.query('SELECT nombre,idHistoriaUsuario,rol,funcionalidad,resultado,fechaModificacion,modificadoPor,idProyecto,estado,identificador, MAX(version) version, prioridad , puntaje FROM historiausuario where estado!="Eliminado" GROUP BY identificador ', function (err, res) {
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
    dbConn.query('Select * from historiausuario where identificador = ? and estado!="Eliminado"', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};


HistoriaUsuario.findByLastUserStorie = function (id, result) {
    dbConn.query('Select idHistoriaUsuario,nombre,rol,funcionalidad,resultado,fechaModificacion,modificadoPor,idProyecto,estado,identificador,MAX(version) version,prioridad,puntaje \n\
    from historiausuario where identificador = ? and estado!="Eliminado" ', id, function (err, res) {
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
    dbConn.query("UPDATE historiausuario SET `estado` = 'Inactivo' WHERE (`idHistoriaUsuario` = ?);",[id], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null,err)
        }else {
            result(null,res)
        }
    })
};

HistoriaUsuario.changeStateToDelete = function (id, result) {
    dbConn.query("UPDATE historiausuario SET estado = 'Eliminado' WHERE identificador = ?",[id], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null,err)
        }else {
            result(null,res)
        }
    })
};

HistoriaUsuario.orderByMedia = function (id,result) {
    dbConn.query('Select * from historiausuario where prioridad="Media" and idProyecto=? and estado!="Eliminado"',[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.orderByBajo = function (id,result) {
    dbConn.query('Select * from historiausuario where prioridad="Bajo" and idProyecto=? and estado!="Eliminado"',[id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.orderByAlta = function (id,result) {
    dbConn.query('Select * from historiausuario where prioridad="Alta" and idProyecto=? and estado!="Eliminado"',[id], function (err, res) {
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
    dbConn.query('SELECT MAX(identificador) as identificador FROM historiausuario and estado!="Eliminado"', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.findByOrganizacion = function (id, result) {
    dbConn.query('SELECT historiausuario.idHistoriaUsuario,historiausuario.nombre, historiausuario.rol, historiausuario.funcionalidad, historiausuario.resultado, \n\
    historiausuario.fechaModificacion, historiausuario.modificadoPor, historiausuario.idProyecto, historiausuario.estado, \n\
    historiausuario.identificador, historiausuario.version, historiausuario.prioridad, historiausuario.puntaje,\n\
    proyecto.idOrganizacion\n\
    and historiausuario.estado!="Eliminado" \n\
     FROM historiausuario inner join proyecto on proyecto.idProyecto=historiausuario.idProyecto where idOrganizacion=?', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.orderByAsc = function (id, result) {
    dbConn.query('SELECT idHistoriaUsuario, nombre,rol,funcionalidad,resultado,fechaModificacion,modificadoPor,\n\
    idProyecto,estado,identificador, MAX(version) version, prioridad , puntaje FROM historiausuario \n\
    where historiausuario.idProyecto=? \n\
    and historiausuario.estado!="Eliminado" \n\
    GROUP BY identificador \n\
    order by nombre ASC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};

HistoriaUsuario.orderByDesc = function (id, result) {
    dbConn.query('SELECT idHistoriaUsuario, nombre,rol,funcionalidad,resultado,fechaModificacion,modificadoPor,\n\
    idProyecto,estado,identificador, MAX(version) version, prioridad , puntaje FROM historiausuario \n\
    where historiausuario.idProyecto=? \n\
    and historiausuario.estado!="Eliminado" \n\
    GROUP BY identificador \n\
    order by nombre DESC', id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('historiausuario : ', res);
            result(null, res);
        }
    });
};


HistoriaUsuario.findByIdProject = function (id, result) {
    dbConn.query("SELECT nombre,idHistoriaUsuario,rol,funcionalidad,resultado,fechaModificacion,modificadoPor,idProyecto,estado,identificador, \n\
    MAX(version) version, prioridad , puntaje FROM historiausuario where estado!='Eliminado' and idProyecto = ? and historiausuario.estado!='Eliminado' \n\
        GROUP BY identificador ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

HistoriaUsuario.findByIdProjectPromise = async function (id) {
    return new  Promise( async (resolve,reject) => {
        dbConn.query("Select * from historiausuario where idProyecto = ? and estado!='Eliminado'", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                return reject(err);
            } else {
                return resolve(res);
            }
        });
    })
};

HistoriaUsuario.getMaxIdentifier = function (result) {
    dbConn.query('SELECT MAX(identificador) as identificador FROM historiausuario where estado!="Eliminado"', function (err, res) {
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