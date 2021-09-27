'use strict';
const UsuarioProyecto = require('../model/usuarioProyecto.model');

exports.create = function(req, res) {
    const new_usuarioProyecto = new UsuarioProyecto(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UsuarioProyecto.create(new_usuarioProyecto, function(err, usuarioProyecto) {
            if (err)
            res.send(err);
            res.json({error:false,message:"UsuarioProyecto added successfully!",data:usuarioProyecto});
        });
    }
};


exports.findAll = function(req, res) {
    UsuarioProyecto.findAll(function(err, usuarioProyecto) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', usuarioProyecto);
    res.send(usuarioProyecto);   
  });
};

/*
exports.findById = function(req, res) {
    UsuarioProyecto.findById(req.params.id, function(err, usuarioProyecto) {
        if (err)
        res.send(err);
        res.json(usuarioProyecto);
    });
};*/


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        UsuarioProyecto.update(req.params.id, new UsuarioProyecto(req.body), function(err, usuarioProyecto) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'UsuarioProyecto successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    UsuarioProyecto.delete( req.params.id, function(err, usuarioProyecto) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'UsuarioProyecto successfully deleted' });
  });
};