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
exports.PostService = void 0;
const post_repository_1 = require("../repositories/post.repository");
const blog_repository_1 = require("../repositories/blog.repository");
const query_builder_1 = require("../helpers/query-builder");
const Repository = new post_repository_1.PostRepository();
const blogRepository = new blog_repository_1.BlogRepository();
class PostService {
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
    create(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const blog = yield blogRepository.findOne(id ? id : body.blogId);
            if (!blog) {
                return false;
            }
            body.blogName = blog.name;
            body.createdAt = date;
            body.blogId = blog.id;
            body.id = id ? id : (+date).toString();
            return yield Repository.create(body);
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Repository.update(id, body);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Repository.delete(id);
        });
    }
}
exports.PostService = PostService;
