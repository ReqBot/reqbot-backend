'use strict';
var dbConn = require('../../../database/db.config');

//ticket object create
var Ticket = function (ticket) {
    this.titulo = ticket.titulo;
    this.fecha = new Date(ticket.fecha);
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

Ticket.findByOrganizacion = function (id,result) {
    //dbConn.query('select * from usuario inner join usuarioproyecto on usuarioproyecto.idUsuario=usuario.idUsuario where usuarioproyecto.idProyecto = ?',id, function (err, res) {
    dbConn.query('Select \n\
    ticket.idTicket, \n\
    ticket.titulo,\n\
    ticket.fecha,\n\
    ticket.tipo,\n\
    ticket.descripcion,\n\
    ticket.estado,\n\
    ticket.creadoPor,\n\
    proyecto.idOrganizacion\n\
    from ticket\n\
    inner join historiausuario on historiausuario.idHistoriaUsuario = ticket.creadoPor\n\
    inner join proyecto on proyecto.idProyecto = historiausuario.idProyecto where proyecto.idOrganizacion=?',id, function (err, res) {
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

Ticket.orderByDesc = function (result) {
    dbConn.query('Select * from ticket ORDER BY fecha DESC', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('ticket : ', res);
            result(null, res);
        }
    });
};

Ticket.orderByAsc = function (result) {
    dbConn.query('Select * from ticket ORDER BY fecha DESC', function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('tickets : ', res);
            result(null, res);
        }
    });
};


module.exports = Ticket;