"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostWithParamValidator = void 0;
const express_validator_1 = require("express-validator");
exports.CreatePostWithParamValidator = [
    (0, express_validator_1.body)('title').trim().isString().isLength({ min: 1, max: 15 }),
    (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }),
    (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 })
];
