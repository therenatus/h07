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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const bcrypt_1 = require("bcrypt");
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const add_1 = __importDefault(require("date-fns/add"));
const hashPassword_1 = require("../helpers/hashPassword");
const email_managers_1 = require("../managers/email-managers");
const Repository = new user_repository_1.UserRepository();
const emailManager = new email_managers_1.EmailManagers();
class AuthService {
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Repository.getOne(body.loginOrEmail);
            if (!user) {
                return false;
            }
            const validPassword = yield (0, bcrypt_1.compare)(body.password, user.accountData.hashPassword);
            if (!validPassword) {
                return false;
            }
            return user;
        });
    }
    getMe(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = yield Repository.findOneById(userID);
            if (!me) {
                return false;
            }
            return me.accountData;
        });
    }
    registration(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, login, password } = body;
            const hashPassword = yield (0, hashPassword_1.generateHash)(password);
            const user = {
                _id: new mongodb_1.ObjectId(),
                accountData: {
                    id: (+new Date()).toString(),
                    login,
                    email,
                    hashPassword,
                    createdAt: new Date()
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, add_1.default)(new Date(), {
                        hours: 1
                    }),
                    isConfirmed: false
                }
            };
            const createResult = Repository.create(user);
            yield emailManager.sendConfirmMessages(user);
            return createResult;
        });
    }
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Repository.getOneByEmail(email);
            yield emailManager.sendConfirmMessages(user);
        });
    }
    confirmUser(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Repository.getOneByCode(code);
            return yield Repository.confirmUser(user.accountData.id);
        });
    }
}
exports.AuthService = AuthService;
