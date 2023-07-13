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
const post_service_1 = require("../service/post.service");
const create_post_validator_1 = require("./validator/create-post.validator");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const basicAuth_middleware_1 = require("../middleware/basicAuth.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const comment_service_1 = require("../service/comment.service");
const comment_query_repository_1 = require("../repositories/query/comment-query.repository");
const create_comment_validator_1 = require("./validator/create-comment.validator");
const router = express_1.default.Router();
const service = new post_service_1.PostService();
const commentService = new comment_service_1.CommentService();
router.put('*', basicAuth_middleware_1.BasicAuthMiddleware);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield service.getAll(req.query);
    const { items, meta } = posts;
    const blogsResponse = {
        pageSize: meta.pageSize,
        page: meta.pageNumber,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: items
    };
    return res.status(200).send(blogsResponse);
}));
router.post('/', basicAuth_middleware_1.BasicAuthMiddleware, create_post_validator_1.createPostValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield service.create(req.body, null);
    if (post === false) {
        return res.status(404).send();
    }
    res.status(201).send(post);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const post = yield service.getOne(req.params.id);
    if (!post) {
        return res.status(404).send('Not Found');
    }
    res.status(200).send(post);
}));
router.put('/:id', create_post_validator_1.createPostValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const deleted = yield service.delete(req.params.id);
    if (!deleted) {
        return res.status(404).send();
    }
    res.status(204).send();
}));
router.post('/:id/comments', auth_middleware_1.AuthMiddleware, create_comment_validator_1.CreateCommentValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    if (!req.userId) {
        return res.status(401).send();
    }
    const comment = yield commentService.createComment(req.params.id, req.body, req.userId);
    if (!comment) {
        return res.status(404).send();
    }
    res.status(201).send(comment);
}));
router.get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const comment = yield (0, comment_query_repository_1.CommentQueryRepository)({ query: req.query, postId: req.params.id });
    if (!comment) {
        return res.status(404).send();
    }
    res.status(200).send(comment);
}));
exports.default = router;
