"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const validationErrorFormatter = ({ msg, path }) => {
    return {
        message: msg,
        field: path,
    };
};
const InputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(validationErrorFormatter);
    if (!errors.isEmpty()) {
        res.status(400).send({ errorsMessages: errors.array({ onlyFirstError: true }) });
    }
    else {
        next();
    }
};
exports.InputValidationMiddleware = InputValidationMiddleware;
