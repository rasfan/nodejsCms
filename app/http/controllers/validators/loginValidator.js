const validator = require('./validator');
const { check } = require('express-validator/check');

class registerValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('Email is not valid.'),

            check('password')
                .isLength({ min: 8 })
                .withMessage('Password most be 8 char at least')
        ];
    }
}

module.exports = new registerValidator();
