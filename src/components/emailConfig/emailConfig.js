const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'daztery@gmail.com', // ethereal user
        pass: 'qnynkfavabimwvxi', // ethereal password
    },
});
//qnynkfavabimwvxi

module.exports = transporter