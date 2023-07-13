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
exports.CommentService = void 0;
const comment_user_mapping_1 = require("../helpers/comment-user-mapping");
const comment_repository_1 = require("../repositories/comment.repository");
const user_repository_1 = require("../repositories/user.repository");
const status_enum_1 = require("../types/status.enum");
const post_repository_1 = require("../repositories/post.repository");
const commentRepository = new comment_repository_1.CommentRepository();
const userRepository = new user_repository_1.UserRepository();
const postRepository = new post_repository_1.PostRepository();
class CommentService {
    createComment(postId, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postRepository.findOne(postId);
            if (!post) {
                return false;
            }
            const author = yield userRepository.findOneById(userId);
            if (!author) {
                return false;
            }
            body.id = (+new Date).toString();
            body.createdAt = new Date;
            body.postId = postId;
            body.commentatorId = userId;
            const comment = yield commentRepository.create(body);
            if (!comment) {
                return false;
            }
            const commentWithUser = (0, comment_user_mapping_1.CommentUserMapping)(comment, author);
            if (!commentWithUser) {
                return false;
            }
            return commentWithUser;
        });
    }
    update(body, id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentRepository.findOne(id);
            if (!comment) {
                return status_enum_1.StatusEnum.NOT_FOUND;
            }
            if (comment.commentatorId !== userId) {
                return status_enum_1.StatusEnum.FORBIDDEN;
            }
            const newComment = yield commentRepository.update(id, body);
            if (!newComment) {
                return status_enum_1.StatusEnum.NOT_FOUND;
            }
            return status_enum_1.StatusEnum.NOT_CONTENT;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentRepository.findOne(id);
            if (comment === null) {
                return status_enum_1.StatusEnum.NOT_FOUND;
            }
            const user = yield userRepository.findOneById(comment.commentatorId);
            if (user === null) {
                return status_enum_1.StatusEnum.NOT_FOUND;
            }
            const commentWithUser = (0, comment_user_mapping_1.CommentUserMapping)(comment, user);
            return commentWithUser;
        });
    }
    deleteOne(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield commentRepository.findOne(id);
            if (comment === null) {
                return status_enum_1.StatusEnum.NOT_FOUND;
            }
            if (comment.commentatorId !== userId) {
                return status_enum_1.StatusEnum.FORBIDDEN;
            }
            const deletedComment = yield commentRepository.deleteComment(id);
            if (!deletedComment) {
                return status_enum_1.StatusEnum.NOT_FOUND;
            }
            return status_enum_1.StatusEnum.NOT_CONTENT;
        });
    }
}
exports.CommentService = CommentService;
