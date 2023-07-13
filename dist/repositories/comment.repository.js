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
exports.CommentRepository = void 0;
const index_1 = require("../index");
class CommentRepository {
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.commentCollection.findOne({ id }, { projection: { _id: 0, postId: 0 } });
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { insertedId } = yield index_1.commentCollection.insertOne(body);
            return yield index_1.commentCollection.findOne({ _id: insertedId }, { projection: { _id: 0, postId: 0 } });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { matchedCount } = yield index_1.commentCollection.updateOne({ id: id }, { $set: data });
            if (matchedCount === 0) {
                return false;
            }
            return true;
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deletedCount } = yield index_1.commentCollection.deleteOne({ id });
            if (deletedCount === 0) {
                return false;
            }
            return true;
        });
    }
}
exports.CommentRepository = CommentRepository;
