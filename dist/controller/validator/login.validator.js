"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.LoginValidator = [
    (0, express_validator_1.body)('password').trim().isLength({ min: 6, max: 20 }).withMessage('Password must be between 6 and 20 characters'),
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.body)('loginOrEmail').trim().isString().isLength({ min: 3, max: 10 }).withMessage('Login must be between 3 and 10 characters'),
        (0, express_validator_1.body)('loginOrEmail').trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Invalid email format')
    ])
];
