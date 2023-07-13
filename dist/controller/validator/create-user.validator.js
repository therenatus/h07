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
exports.CreateUserValidator = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../../index");
exports.CreateUserValidator = [
    (0, express_validator_1.body)('login').trim().isString().isLength({ min: 3, max: 10 }).custom((login) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield index_1.userCollection.findOne({ login: login });
        if (user) {
            throw new Error('Login is taken');
        }
        return true;
    })),
    (0, express_validator_1.body)('password').trim().isLength({ min: 6, max: 20 }),
    (0, express_validator_1.body)('email').trim().notEmpty().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield index_1.userCollection.findOne({ email: email });
        if (user) {
            throw new Error('Email is taken');
        }
        return true;
    }))
];
