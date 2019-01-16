const validator = require('./validator');
const { check } = require('express-validator/check');

class registerValidator extends validator {
    handle() {
        return [
            check('name')
                .isLength({ min: 5 })
                .withMessage('Name must be at least 5'),

            check('email')
                .isEmail()
                .withMessage('Email is not valid'),

            check('password')
                .isLength({ min: 8 })
                .withMessage(' Password mus be at least 8')
        ];
    }
}

module.exports = new registerValidator();
