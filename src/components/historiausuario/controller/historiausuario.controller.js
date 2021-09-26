'use strict';

const HistoriaUsuario = require('../model/historiausuario.model');


exports.create = function (req, res) {
    const new_historiausuario = new HistoriaUsuario(req.body);

        HistoriaUsuario.create(new_historiausuario, function (err, historiausuario) {
            if (err){
                res.json({
                    error: true,
                    message: "HistoriaUsuario cant added!"
                });
            }                
            res.json({
                error: false,
                message: "HistoriaUsuario added successfully!",
                data: historiausuario
            });
        });
};


exports.findAll = function (req, res) {
    HistoriaUsuario.findAll(function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.findById = function (req, res) {
    HistoriaUsuario.findById(req.params.id, function (err, historiausuario) {
        if (err)
            res.send(err);
        res.json(historiausuario);
    });
};

exports.findByPendientes = function (req, res) {
    HistoriaUsuario.findByPendientes(function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.findByProyectoPendientes = function (req, res) {
    HistoriaUsuario.findByProyectoPendientes(req.params.id, function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.findByAprobados = function (req, res) {
    HistoriaUsuario.findByAprobados(function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.findByIdentifier = function (req, res) {
    HistoriaUsuario.findByIdentifier(req.params.id, function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.findByProyectoAprobados = function (req, res) {
    HistoriaUsuario.findByProyectoAprobados(req.params.id, function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};


exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        HistoriaUsuario.update(req.params.id, new HistoriaUsuario(req.body), function (err, historiausuario) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'HistoriaUsuario successfully updated'
            });
        });
    }

};


exports.delete = function (req, res) {
    HistoriaUsuario.delete(req.params.id, function (err, historiausuario) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'HistoriaUsuario successfully deleted'
        });
    });
};

exports.changeToInactive = (req, res) => {
    HistoriaUsuario.changeStateToInactive(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'HistoriaUsuario inactive'
        })
    })
};

exports.orderByMedia = function (req, res) {
    HistoriaUsuario.orderByMedia(function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.orderByBajo = function (req, res) {
    HistoriaUsuario.orderByBajo(function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};

exports.orderByAlta = function (req, res) {
    HistoriaUsuario.orderByAlta(function (err, historiausuario) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', historiausuario);
        res.send(historiausuario);
    });
};