"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidator = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../../index");
exports.createPostValidator = [
    (0, express_validator_1.body)('title').trim().isString().isLength({ min: 1, max: 15 }),
    (0, express_validator_1.body)('shortDescription').trim().isLength({ min: 1, max: 100 }),
    (0, express_validator_1.body)('content').trim().isLength({ min: 1, max: 1000 }),
    (0, express_validator_1.body)('blogId').trim().isString().custom((blogId) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield index_1.blogCollection.findOne({ id: blogId });
        if (!blog) {
            throw new Error('BlogID not found');
        }
        return true;
    }))
];
