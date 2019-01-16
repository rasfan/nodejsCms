const validator = require('./validator');
const { check } = require('express-validator/check');

class forgotPasswordValidator extends validator {
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('Email is not valid'),

            check('token')
                .not()
                .isEmpty()
                .withMessage('Token is required'),

            check('password')
                .isLength({ min: 8 })
                .withMessage('assword most be 8 char at least')
        ];
    }
}

module.exports = new forgotPasswordValidator();
