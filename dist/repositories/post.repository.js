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
exports.PostRepository = void 0;
const index_1 = require("../index");
const findAllWithCount_1 = require("../helpers/findAllWithCount");
const mongodb_1 = require("mongodb");
class PostRepository {
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, findAllWithCount_1.FindAllWithCount)(query, index_1.postCollection, null);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let findBy;
            mongodb_1.ObjectId.isValid(id) ? findBy = { _id: new mongodb_1.ObjectId(id) } : findBy = { id };
            return yield index_1.postCollection.findOne(findBy, { projection: { _id: 0 } });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insertedId } = yield index_1.postCollection.insertOne(body);
            return yield index_1.postCollection.findOne({ _id: insertedId }, { projection: { _id: 0 } });
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield index_1.postCollection.findOneAndUpdate({ id }, { $set: body }, { returnDocument: 'after' });
            if (!res.ok) {
                return false;
            }
            return res.value;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield index_1.postCollection.deleteOne({ id });
            if (deletedCount === 0) {
                return false;
            }
            return true;
        });
    }
}
exports.PostRepository = PostRepository;
