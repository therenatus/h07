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
exports.BlogService = void 0;
const blog_repository_1 = require("../repositories/blog.repository");
const query_builder_1 = require("../helpers/query-builder");
const Repository = new blog_repository_1.BlogRepository();
class BlogService {
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySearch = (0, query_builder_1.QueryBuilder)(query);
            const meta = Object.assign(Object.assign({}, querySearch), { totalCount: 0 });
            const { data, totalCount } = yield Repository.find(querySearch);
            meta.totalCount = totalCount;
            data.map((blog) => {
                delete blog._id;
            });
            return { items: data, meta: meta };
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Repository.findOne(id);
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            body.createdAt = date;
            body.id = (+date).toString();
            body.isMembership = false;
            return yield Repository.create(body);
        });
    }
    findBlogsPost(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const querySearch = (0, query_builder_1.QueryBuilder)(query);
            const meta = Object.assign(Object.assign({}, querySearch), { totalCount: 0 });
            const blog = yield this.getOne(id);
            if (!blog) {
                return false;
            }
            const { data, totalCount } = yield Repository.findBlogsPost(blog.id, querySearch);
            meta.totalCount = totalCount;
            data.map((post) => {
                delete post._id;
            });
            return { items: data, meta: meta };
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Repository.updateOne(id, body);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Repository.deleteOne(id);
        });
    }
}
exports.BlogService = BlogService;
