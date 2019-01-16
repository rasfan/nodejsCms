const validator = require('./validator');
const { check } = require('express-validator/check');

class forgotPasswordValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('Email is not valid.')
        ];
    }
}

module.exports = new forgotPasswordValidator();
