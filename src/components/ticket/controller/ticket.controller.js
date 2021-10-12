'use strict';

const Ticket = require('../model/ticket.model');


exports.create = function(req, res) {
    const new_ticket = new Ticket(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Ticket.create(new_ticket, function(err, ticket) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Ticket added successfully!",data:ticket});
        });
    }
};


exports.findAll = function(req, res) {
    Ticket.findAll(function(err, ticket) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', ticket);
    res.send(ticket);
    
  });
};

exports.findById = function(req, res) {
    Ticket.findById(req.params.id, function(err, ticket) {
        if (err)
        res.send(err);
        res.json(ticket);
    });
};

exports.findByOrganizacion = function (req, res) {
    Ticket.findByOrganizacion(req.params.id, function (err, ticket) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', ticket);
        res.send(ticket);
    });
};

exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Ticket.update(req.params.id, new Ticket(req.body), function(err, ticket) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Ticket successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Ticket.delete( req.params.id, function(err, ticket) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Ticket successfully deleted' });
  });
};


exports.orderByAsc = function (req, res) {
    Ticket.orderByAsc(req.params.id, function (err, ticket) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', ticket);
        res.send(ticket);
    });
};


exports.orderByDesc = function (req, res) {
    Ticket.orderByDesc(req.params.id, function (err, ticket) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', ticket);
        res.send(ticket);
    });
};
