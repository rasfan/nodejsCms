const controller = require('app/http/controllers/controller');

class registerController extends controller {
    showRegsitrationForm(req, res) {
        res.render('auth/register', { messages: req.flash('errors') });
    }

    registerProccess(req, res, next) {
        this.validationData(req).then(result => {
            if (result) res.json('register proccess');
            else res.redirect('/register');
        });
    }

    validationData(req) {
        req.checkBody('name', 'Name cant be less than 5 char').isLength({
            min: 5
        });
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password cant be less than 8 char').isLength(
            { min: 8 }
        );

        return req
            .getValidationResult()
            .then(result => {
                const errors = result.array();
                const messages = [];
                errors.forEach(err => messages.push(err.msg));

                if (errors.length == 0) return true;

                req.flash('errors', messages);
                return false;
            })
            .catch(err => console.log(err));
    }
}

module.exports = new registerController();
