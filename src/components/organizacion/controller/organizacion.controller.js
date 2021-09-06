'use strict';

const Organizacion = require('../model/organizacion.model');


exports.create = function(req, res) {
    const new_organizacion = new Organizacion(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Organizacion.create(new_organizacion, function(err, organizacion) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Organizacion added successfully!",data:organizacion});
        });
    }
};


exports.findAll = function(req, res) {
    Organizacion.findAll(function(err, organizacion) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', organizacion);
    res.send(organizacion);
  });
};

exports.findById = function(req, res) {
    Organizacion.findById(req.params.id, function(err, organizacion) {
        if (err)
        res.send(err);
        res.json(organizacion);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Organizacion.update(req.params.id, new Organizacion(req.body), function(err, organizacion) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Organizacion successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Organizacion.delete( req.params.id, function(err, organizacion) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Organizacion successfully deleted' });
  });
};