"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentValidator = void 0;
const express_validator_1 = require("express-validator");
exports.CreateCommentValidator = [
    (0, express_validator_1.body)('content').isLength({ min: 20, max: 300 }).withMessage('Content must be between 20 and 300 characters')
];
