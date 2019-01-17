const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'iuvxbqfvcnt6gobp@ethereal.email',
        pass: '44zaAwezfCNyKMrkpj'
    }
});

module.exports = transporter;
