'use strict';

const Proyecto = require('../model/proyecto.model');


exports.create = function(req, res) {
    const new_proyecto = new Proyecto(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Proyecto.create(new_proyecto, function(err, proyecto) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Proyecto added successfully!",data:proyecto});
        });
    }
};

exports.findAll = function(req, res) {
    Proyecto.findAll(function(err, proyecto) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', proyecto);
    res.send(proyecto);
    
  });
};

exports.findById = function(req, res) {
    Proyecto.findById(req.params.id, function(err, proyecto) {
        if (err)
        res.send(err);
        res.json(proyecto);
    });
};

exports.findByOrganizacion = function(req, res) {
    Proyecto.findByOrganizacion(req.params.id,function (err, proyecto) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', proyecto);
        res.send(proyecto);
    });
};


exports.getUsers = function(req, res) {
    Proyecto.getUsers(req.params.id,function (err, proyecto) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', proyecto);
        res.send(proyecto);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Proyecto.update(req.params.id, new Proyecto(req.body), function(err, proyecto) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Proyecto successfully updated' });
        });
    }
};

exports.changeToInactive = (req, res) => {
    Proyecto.changeStateToInactive(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            message: 'Proyecto inactive'
        })
    })
};

exports.delete = function(req, res) {
    Proyecto.delete( req.params.id, function(err, proyecto) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Proyecto successfully deleted' });
  });
};

exports.orderByAsc = function (req, res) {
    Proyecto.orderByAsc(function (err, proyecto) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', proyecto);
        res.send(proyecto);
    });
};

exports.orderByDesc = function (req, res) {
    Proyecto.orderByDesc(function (err, proyecto) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', proyecto);
        res.send(proyecto);
    });
};
