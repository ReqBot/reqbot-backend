'use strict';
const {
    Usuario
} = require('../model/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    rollback
} = require('../../../database/db.config');

exports.create = async function (req, res) {
    const new_usuario = new Usuario(req.body);
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({
                error: true,
                message: 'Please provide all required field'
            });
        } else {
            const hashedPassword = await bcrypt.hash(new_usuario.contrasenia, 10)
            console.log(hashedPassword);
            new_usuario.contrasenia = hashedPassword;

            Usuario.create(new_usuario, function (err, usuario) {
                if (err)
                    res.send(err);
                res.json({
                    error: false,
                    message: "Usuario added successfully!",
                    data: usuario
                });
            });
        }
    } catch (e) {
        res.json({
            message: e.toString()
        });
    }

    //handles null error

};

exports.login = async function (req, res) {
    Usuario.findByCorreo(req.body.correo, async function (err, usuario) {
        const user = usuario[0];
        console.log(user)
        try {
            const match = await bcrypt.compare(req.body.contrasenia, user.contrasenia);
            const accessToken = jwt.sign(JSON.stringify(user), "my_secret_key");
            //console.log(accessToken)
            console.log(req.session)
            if (match) {
                req.session.user = usuario[0]
                req.session.accessToken = accessToken
                res.json({
                    error: false,
                    accessToken: accessToken,
                    data: {
                        id: user.idUsuario,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        correo: user.correo,
                        contrasenia: user.contrasenia,
                        rol: user.rol,
                        estado: user.estado,
                        idOrganizacion: user.idOrganizacion,
                    }
                })
            } else {
                res.send('Not allowed, invalid credentials')
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: 'Cannot find user',
                err: e
            });
        }
    })
}

exports.logOut = function (req, res) {
    //req.session = null
    req.session.destroy()
    console.log("SESSIONNNNNNNN")
    console.log(req.session)
    res.send({
        error: false,
        message: "Log out"
    })
}



exports.findAll = function (req, res) {
    Usuario.findAll(function (err, usuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', usuario);
        res.send(usuario);

    });
};

exports.findById = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        if (err)
            res.send(err);
        res.json(usuario);
    });
};

exports.findByOrganizacion = function (req, res) {
    Usuario.findByOrganizacion(req.params.id, function (err, usuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', usuario);
        res.send(usuario);
    });
};

exports.findByUsuarioPorProyecto = function (req, res) {
    Usuario.findByUsuarioPorProyecto(req.params.id, function (err, usuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', usuario);
        res.send(usuario);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Usuario.update(req.params.id, new Usuario(req.body), function (err, usuario) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Usuario successfully updated'
            });
        });
    }

};

exports.updateEstado = function (req, res) {
    Usuario.updateEstado(req.params.id, new Usuario(req.body), function (err, usuario) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Usuario successfully updated'
        });
    });
};


exports.delete = function (req, res) {
    Usuario.delete(req.params.id, function (err, usuario) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Usuario successfully deleted'
        });
    });
};


exports.changeToInactive = (req, res) => {
    Usuario.changeStateToInactive(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Usuario inactive'
        })
    })
};

exports.changePassword = async (req, res) => {
    let user;
    Usuario.findByCorreo(req.body.correo, async (err, usuario) => {
        if (err) {
            res.send(err);
        } else {
            user = usuario[0];
            try {
                const match = await bcrypt.compare(req.body.contrasenia, user.contrasenia);
                if (match) {
                    const hashedPassword = await bcrypt.hash(req.body.newcontrasenia, 10)
                    user.contrasenia = hashedPassword;
                    Usuario.changePassword(user, (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json({
                                message: "Success password change"
                            })
                        }
                    })
                } else {
                    res.send('Not allowed, invalid credentials')
                }
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    message: 'Cannot find user',
                    err: err
                });
            }
        }
    })
};