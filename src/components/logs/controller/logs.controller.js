'use strict';

const Logs = require('../model/logs.model');


exports.create = function (req, res) {
    const new_logs = new Logs(req.body);

    //handles null error 
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Logs.create(new_logs, function (err, logs) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: "Logs added successfully!",
                data: logs
            });
        });
    }
};


exports.findAll = function (req, res) {
    Logs.findAll(function (err, logs) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', logs);
        res.send(logs);
    });
};

exports.findById = function (req, res) {
    Logs.findById(req.params.id, function (err, logs) {
        if (err)
            res.send(err);
        res.json(logs);
    });
};


exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Logs.update(req.params.id, new Logs(req.body), function (err, logs) {
            if (err)
                res.send(err);
            res.json({
                error: false,
                message: 'Logs successfully updated'
            });
        });
    }

};


exports.delete = function (req, res) {
    Logs.delete(req.params.id, function (err, logs) {
        if (err)
            res.send(err);
        res.json({
            error: false,
            message: 'Logs successfully deleted'
        });
    });
};

exports.findByOrganizacion = function (req, res) {
    Logs.findByOrganizacion(req.params.id, function (err, logs) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', logs);
        res.send(logs);
    });
};