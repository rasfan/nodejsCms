const validator = require('./validator');
const { check } = require('express-validator/check');

class registerValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage(' Email is not valid '),

            check('password')
                .isLength({ min: 8 })
                .withMessage('Password mus be at least 8')
        ];
    }
}

module.exports = new registerValidator();
