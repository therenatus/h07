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
exports.UserRepository = void 0;
const findAllWithCount_1 = require("../helpers/findAllWithCount");
const index_1 = require("../index");
const mongodb_1 = require("mongodb");
class UserRepository {
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, findAllWithCount_1.FindAllWithCount)(query, index_1.userCollection, null);
            const totalCount = users.totalCount;
            const userMap = users.data.map((user) => {
                return user.accountData;
            });
            return { data: userMap, totalCount };
        });
    }
    getOne(search) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.userCollection.findOne({ $or: [{ email: search }, { login: search }] });
        });
    }
    getOneByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.userCollection.findOne({ 'emailConfirmation.confirmationCode': code });
        });
    }
    getOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.userCollection.findOne({ 'accountData.email': email });
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (mongodb_1.ObjectId.isValid(id)) {
                filter = { _id: new mongodb_1.ObjectId(id) };
            }
            if (!mongodb_1.ObjectId.isValid(id)) {
                filter = { 'accountData.id': id };
            }
            return yield index_1.userCollection.findOne(filter, { projection: { _id: 0, hashPassword: 0 } });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insertedId } = yield index_1.userCollection.insertOne(body);
            return insertedId;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield index_1.userCollection.deleteOne({ id });
            if (deletedCount === 0) {
                return false;
            }
            return true;
        });
    }
    confirmUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matchedCount } = yield index_1.userCollection.updateOne({ 'accountData.id': id }, { $set: { 'emailConfirmation.isConfirmed': true } });
            if (matchedCount === 0) {
                return false;
            }
            return true;
        });
    }
}
exports.UserRepository = UserRepository;
