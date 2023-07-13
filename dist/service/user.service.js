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
exports.UserService = void 0;
const query_builder_1 = require("../helpers/query-builder");
const user_repository_1 = require("../repositories/user.repository");
const hashPassword_1 = require("../helpers/hashPassword");
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const add_1 = __importDefault(require("date-fns/add"));
const Repository = new user_repository_1.UserRepository();
class UserService {
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySearch = (0, query_builder_1.QueryBuilder)(query);
            const meta = Object.assign(Object.assign({}, querySearch), { totalCount: 0 });
            const { data, totalCount } = yield Repository.getAll(querySearch);
            meta.totalCount = totalCount;
            return { items: data, meta: meta };
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield (0, hashPassword_1.generateHash)(body.password);
            const user = {
                _id: new mongodb_1.ObjectId(),
                accountData: {
                    id: (+new Date()).toString(),
                    hashPassword,
                    email: body.email,
                    login: body.login,
                    createdAt: new Date()
                },
                emailConfirmation: {
                    confirmationCode: (0, uuid_1.v4)(),
                    expirationDate: (0, add_1.default)(new Date(), {
                        hours: 1
                    }),
                    isConfirmed: true
                }
            };
            const newUserId = yield Repository.create(user);
            if (!newUserId)
                return null;
            const newUser = yield Repository.findOneById(newUserId);
            if (!newUser)
                return null;
            return newUser.accountData;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Repository.delete(id);
        });
    }
}
exports.UserService = UserService;
