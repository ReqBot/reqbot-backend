'use strict';
var dbConn = require('../../../database/db.config');

//ticket object create
var Ticket = function (ticket) {
    this.titulo = ticket.titulo;
    this.fecha = ticket.fecha;
    this.tipo = ticket.tipo;
    this.descripcion = ticket.descripcion;
    this.estado = ticket.estado;
    this.creadoPor = ticket.creadoPor;
};

Ticket.create = function (newticket, result) {
    dbConn.query("INSERT INTO ticket set ?", newticket, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


Ticket.findById = function (id, result) {
    dbConn.query("Select * from ticket where idTicket = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Ticket.findAll = function (result) {
    dbConn.query("Select * from ticket", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('ticket : ', res);
            result(null, res);
        }
    });
};

Ticket.update = function (id, ticket, result) {
    dbConn.query("UPDATE ticket SET titulo=?,fecha=?,tipo=?,descripcion=?,estado=?,creadoPor=? WHERE idTicket = ?",
        [   ticket.titulo,
            ticket.fecha,
            ticket.tipo,
            ticket.descripcion,
            ticket.estado,
            ticket.creadoPor,
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

Ticket.delete = function (id, result) {
    dbConn.query("DELETE FROM ticket WHERE idTicket = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


module.exports = Ticket;