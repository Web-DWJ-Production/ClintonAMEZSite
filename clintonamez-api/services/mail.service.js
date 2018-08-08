var transporter = require('../mailers/dwj.mailer.js')
const nodemailer = require('nodemailer');
var secret = process.env.JWT_SECRET || 'changeme';
var expressJWT = require('express-jwt');
var path = require('path');

var mail = {};

mail.send = (req, res) => {
    if (!req.body.to) {
        res.status(200).json({ message: 'Mail (send) failed.' });
    }

    var mailOptions = {
        from: 'helpdesk.dwjproduction@gmail.com', /* sender address */
        to: req.body.to, /* list of receivers*/
        subject: req.body.subject, /* Subject line*/
        text: req.body.text, /* plaintext body */
        html: req.body.html/* html body */
    };

    /* send mail with defined transport object */
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(200).json(false);
        }
    });

    res.status(200).json(true);
    
};

module.exports = mail;