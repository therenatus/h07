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
exports.CheckEmailValidator = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../../index");
const urlPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
exports.CheckEmailValidator = [
    (0, express_validator_1.body)('email').trim().isString().matches(urlPattern).custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield index_1.userCollection.findOne({ 'accountData.email': email });
        if (!user || user.emailConfirmation.isConfirmed) {
            throw new Error('Email not found');
        }
        return true;
    }))
];
