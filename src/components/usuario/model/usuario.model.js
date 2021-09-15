'use strict';
var dbConn = require('../../../database/db.config');

const roles = {
    ADMINISTRADOR: "Administrador",
    ANALISTA: "Analista",
    CLIENTE: "CLIENTE"
}

//usuario object create
var Usuario = function (usuario) {
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.correo = usuario.correo;
    this.contrasenia = usuario.contrasenia;
    this.rol = usuario.rol;
    this.estado = usuario.estado;
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
    dbConn.query('SELECT * FROM proyecto inner join usuarioproyecto on proyecto.idProyecto=usuarioproyecto.idProyecto  where idOrganizacion=?',id, function (err, res) {
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
    dbConn.query("UPDATE usuario SET nombre=?,apellido=?,correo=?,contrasenia=?,rol=?,estado=? WHERE idUsuario = ?",
        [   usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.contrasenia,
            usuario.rol,
            usuario.estado,
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


module.exports = {
    Usuario,
    roles
};