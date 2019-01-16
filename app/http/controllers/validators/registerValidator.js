const validator = require('./validator');
const { check } = require('express-validator/check');

class registerValidator extends validator {
    handle() {
        return [
            check('name')
                .isLength({ min: 5 })
                .withMessage('The name must be at least 5 char.'),

            check('email')
                .isEmail()
                .withMessage('Email is not valid'),

            check('password')
                .isLength({ min: 8 })
                .withMessage('Password most be 8 char at least')
        ];
    }
}

module.exports = new registerValidator();
