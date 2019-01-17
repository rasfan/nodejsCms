const controller = require('app/http/controllers/controller');
const passport = require('passport');
const PasswordReset = require('app/models/password-reset');
const User = require('app/models/user');
const uniqueString = require('unique-string');
const mail = require('./../../../mail');

class forgotPasswordController extends controller {
    showForgotPassword(req, res) {
        const title = 'Forget Password';
        res.render('home/auth/passwords/email', {
            errors: req.flash('errors'),
            recaptcha: this.recaptcha.render(),
            title
        });
    }

    async sendPasswordResetLink(req, res, next) {
        // await this.recaptchaValidation(req, res);
        let result = await this.validationData(req);
        if (result) {
            return this.sendResetLink(req, res);
        }

        return res.redirect('/auth/password/reset');
    }

    async sendResetLink(req, res, next) {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('errors', 'This user is not exist.');
            return this.back(req, res);
        }

        const newPasswordReset = new PasswordReset({
            email: req.body.email,
            token: uniqueString()
        });

        await newPasswordReset.save();

        let mailOptions = {
            from: '"nodejs cms" <r.sahafamin@gmail.com>', // sender address
            to: `${newPasswordReset.email}`, // list of receivers
            subject: 'Reset password  ', // Subject line
            html: `
                <h2>Reset password  </h2>
                <p>Click</p>
                <a href="http://localhost:3000/auth/password/reset/${
                    newPasswordReset.token
                }">Reset </a>
            ` // html body
        };
        // send Mail
        mail.sendMail(mailOptions, (err, info) => {
            if (err) return console.log(err);

            console.log('Message Sent : %s', info.messageId);

            return res.redirect('/');
        });

        res.redirect('/');
    }
}

module.exports = new forgotPasswordController();
