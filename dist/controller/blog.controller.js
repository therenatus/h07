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
const express_1 = __importDefault(require("express"));
const blog_service_1 = require("../service/blog.service");
const create_blog_validator_1 = require("./validator/create-blog.validator");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const basicAuth_middleware_1 = require("../middleware/basicAuth.middleware");
const create_post_with_param_validator_1 = require("./validator/create-post-with-param.validator");
const post_service_1 = require("../service/post.service");
const router = express_1.default.Router();
const service = new blog_service_1.BlogService();
const postService = new post_service_1.PostService();
router.post('*', basicAuth_middleware_1.BasicAuthMiddleware);
router.put('*', basicAuth_middleware_1.BasicAuthMiddleware);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service.getAll(req.query);
    const { items, meta } = data;
    const blogsResponse = {
        pageSize: meta.pageSize,
        page: meta.pageNumber,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: items
    };
    return res.status(200).send(blogsResponse);
}));
router.post('/', create_blog_validator_1.CreateBlogValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield service.create(req.body);
    if (!blog) {
        return res.status(404).send();
    }
    return res.status(201).send(blog);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const blog = yield service.getOne(req.params.id);
    if (!blog) {
        return res.status(404).send();
    }
    res.status(200).send(blog);
}));
router.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const posts = yield service.findBlogsPost(req.params.id, req.query);
    if (typeof posts === "boolean") {
        return res.status(404).send();
    }
    const { items, meta } = posts;
    const blogsResponse = {
        pageSize: meta.pageSize,
        page: meta.pageNumber,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: items
    };
    res.status(200).send(blogsResponse);
}));
router.post('/:id/posts', create_post_with_param_validator_1.CreatePostWithParamValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const post = yield postService.create(req.body, req.params.id);
    if (post === false || !post) {
        return res.status(404).send();
    }
    res.status(201).send(post);
}));
router.put('/:id', create_blog_validator_1.CreateBlogValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const post = yield service.update(req.params.id, req.body);
    if (!post) {
        return res.status(404).send();
    }
    res.status(204).send(post);
}));
router.delete('/:id', basicAuth_middleware_1.BasicAuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const blog = yield service.delete(req.params.id);
    if (!blog) {
        return res.status(404).send();
    }
    res.status(204).send();
}));
exports.default = router;
