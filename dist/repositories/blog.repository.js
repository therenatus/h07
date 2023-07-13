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
exports.BlogRepository = void 0;
const index_1 = require("../index");
const findAllWithCount_1 = require("../helpers/findAllWithCount");
class BlogRepository {
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, findAllWithCount_1.FindAllWithCount)(query, index_1.blogCollection, null);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.blogCollection.findOne({ id: id }, { projection: { _id: 0 } });
        });
    }
    findBlogsPost(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, findAllWithCount_1.FindAllWithCount)(query, index_1.postCollection, id);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insertedId } = yield index_1.blogCollection.insertOne(body);
            return yield index_1.blogCollection.findOne({ _id: insertedId }, { projection: { _id: 0 } });
        });
    }
    updateOne(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matchedCount } = yield index_1.blogCollection.updateOne({ id }, { $set: body });
            if (matchedCount === 0) {
                return false;
            }
            return true;
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield index_1.blogCollection.deleteOne({ id });
            if (deletedCount === 0) {
                return false;
            }
            return true;
        });
    }
}
exports.BlogRepository = BlogRepository;
