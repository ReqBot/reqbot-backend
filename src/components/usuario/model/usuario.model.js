'use strict';
var dbConn = require('../../../database/db.config');

const roles = {
    ADMINISTRADOR: "Administrador",
    ANALISTA: "Analista",
    CLIENTE: "Cliente"
}

//usuario object create
var Usuario = function (usuario) {
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.correo = usuario.correo;
    this.contrasenia = usuario.contrasenia;
    this.rol = usuario.rol;
    this.estado = usuario.estado;
    this.idOrganizacion = usuario.idOrganizacion;
};

Usuario.create = function (newusuario, result) {
    dbConn.query("INSERT INTO usuario set ?", newusuario, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Usuario.findByCorreo = function (correo, result) {
    dbConn.query("Select * from usuario where correo = ? ",correo,function (err,res) {
        if(err){
            console.log("Error in Find by Correo: " + err);
            result(null, err);
        }else {
            result(null,res);
        }
    })
}

Usuario.findById = function (id, result) {
    dbConn.query("Select * from usuario where idusuario = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Usuario.changeStateToInactive = function (id, result) {
    dbConn.query("UPDATE `usuario` SET `estado` = 'Inactivo' WHERE (`idUsuario` = ?);",[id], (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(null,err)
        }else {
            result(null,res)
        }
    })
}

Usuario.findAll = function (result) {
    dbConn.query("Select * from usuario", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('usuario : ', res);
            result(null, res);
        }
    });
};

Usuario.findByOrganizacion = function (id,result) {
    dbConn.query('SELECT idUsuario,nombre,apellido,correo,rol,estado,idOrganizacion FROM usuario where idOrganizacion=?',id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('usuario : ', res);
            result(null, res);
        }
    });
};

Usuario.findByUsuarioPorProyecto = function (id,result) {
    dbConn.query('select * from usuario inner join usuarioproyecto on usuarioproyecto.idUsuario=usuario.idUsuario where usuarioproyecto.idProyecto = ?',id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('usuario : ', res);
            result(null, res);
        }
    });
};

Usuario.update = function (id, usuario, result) {
    dbConn.query("UPDATE usuario SET nombre=?,apellido=?,correo=?,rol=?,estado=?, idOrganizacion=? WHERE idUsuario = ?",
        [   usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.rol,
            usuario.estado,
            usuario.idOrganizacion,
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

Usuario.updateEstado = function (id, usuario, result) {
    dbConn.query('UPDATE usuario SET estado="Inactivo" WHERE idUsuario = ?',
        [   
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

Usuario.delete = function (id, result) {
    dbConn.query("DELETE FROM usuario WHERE idUsuario = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Usuario.changePassword = function (user,result) {
    dbConn.query("UPDATE `usuario` SET `contrasenia` = ? WHERE (`idUsuario` = ?);",[user.contrasenia,user.idUsuario],function (err,res){
        if (!err) {
            result(null, res);
        } else {
            console.log("Error in find by user")
            result(err, null);
        }
    })
};

Usuario.findByIdPromise = async function (id) {
    return new  Promise( async (resolve,reject) => {
        dbConn.query("Select * from usuario where idusuario = ? ", id, function (err, res) {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
};

module.exports = {
    Usuario,
    roles
};