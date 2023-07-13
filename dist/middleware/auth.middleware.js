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
exports.AuthMiddleware = void 0;
const jwtService_1 = require("../helpers/jwtService");
const jwtService = new jwtService_1.JwtService();
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).send("forbiden 2");
        return;
    }
    const token = auth.split(' ')[1];
    if (!token) {
        return res.status(401).send("Forbidden");
    }
    const userId = yield jwtService.getUserByToken(token);
    console.log(userId);
    if (!userId) {
        return res.status(401).send("Forbidden");
    }
    req.userId = userId.id;
    next();
});
exports.AuthMiddleware = AuthMiddleware;
