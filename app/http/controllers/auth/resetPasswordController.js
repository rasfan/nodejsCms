const controller = require('app/http/controllers/controller');
const passport = require('passport');
const PasswordReset = require('app/models/password-reset');
const User = require('app/models/user');
const uniqueString = require('unique-string');

class resetPasswordController extends controller {
    showResetPassword(req, res) {
        const title = 'Recovery password';
        res.render('home/auth/passwords/reset', {
            errors: req.flash('errors'),
            recaptcha: this.recaptcha.render(),
            title,
            token: req.params.token
        });
    }

    async resetPasswordProccess(req, res, next) {
        //  await this.recaptchaValidation(req, res);
        let result = await this.validationData(req);
        if (result) {
            return this.resetPassword(req, res);
        }

        return res.redirect('/auth/password/reset/' + req.body.token);
    }

    async resetPassword(req, res) {
        let field = await PasswordReset.findOne({
            $and: [{ email: req.body.email }, { token: req.body.token }]
        });
        if (!field) {
            req.flash('errors', 'Invalid inputs');
            return this.back(req, res);
        }

        if (field.use) {
            req.flash('errors', 'This link was used before');
            return this.back(req, res);
        }

        let user = await User.findOneAndUpdate(
            { email: field.email },
            { $set: { password: req.body.password } }
        );
        if (!user) {
            req.flas('errors', 'Can not update infoes.');
            return this.back();
        }

        await field.update({ use: true });
        return res.redirect('/auth/login');
    }
}

module.exports = new resetPasswordController();
