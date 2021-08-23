'use strict';

const Plan = require('../model/plan.model');


exports.create = function(req, res) {
    const new_plan = new Plan(req.body);

    //handles null error 
   if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Plan.create(new_plan, function(err, plan) {
            if (err)
            res.send(err);
            res.json({error:false,message:"Plan added successfully!",data:plan});
        });
    }
};



exports.findAll = function(req, res) {
    Plan.findAll(function(err, plan) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', plan);
    res.send(plan);
  });
};

exports.findById = function(req, res) {
    Plan.findById(req.params.id, function(err, plan) {
        if (err)
        res.send(err);
        res.json(plan);
    });
};


exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Plan.update(req.params.id, new Plan(req.body), function(err, plan) {
            if (err)
            res.send(err);
            res.json({ error:false, message: 'Plan successfully updated' });
        });
    }
  
};


exports.delete = function(req, res) {
    Plan.delete( req.params.id, function(err, plan) {
    if (err)
    res.send(err);
    res.json({ error:false, message: 'Plan successfully deleted' });
  });
};