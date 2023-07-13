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
exports.CommentQueryRepository = void 0;
const index_1 = require("../../index");
const comment_user_mapping_1 = require("../../helpers/comment-user-mapping");
const user_repository_1 = require("../user.repository");
const query_builder_1 = require("../../helpers/query-builder");
const data_with_pagination_1 = require("../../helpers/data-with-pagination");
const post_repository_1 = require("../post.repository");
const userRepository = new user_repository_1.UserRepository();
const postRepository = new post_repository_1.PostRepository();
const CommentQueryRepository = ({ query, postId }) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postRepository.findOne(postId);
    if (!post) {
        return false;
    }
    const querySearch = (0, query_builder_1.QueryBuilder)(query);
    const meta = Object.assign(Object.assign({}, querySearch), { totalCount: 0 });
    const { sortDirection, pageSize, pageNumber, sortBy } = querySearch;
    const sortOptions = {};
    sortOptions[sortBy] = sortDirection;
    const total = yield index_1.commentCollection.countDocuments({ postId: postId });
    meta.totalCount = total;
    const data = yield index_1.commentCollection
        .find({ postId: postId }, { projection: { postId: 0, _id: 0 } })
        .sort(sortOptions)
        .skip(+pageSize * (pageNumber - 1))
        .limit(+pageSize)
        .toArray();
    const commentWithUsers = yield Promise.all(data.map((comment) => __awaiter(void 0, void 0, void 0, function* () {
        const author = yield userRepository.findOneById(comment.commentatorId);
        return (0, comment_user_mapping_1.CommentUserMapping)(comment, author);
    })));
    const dataWithPagination = (0, data_with_pagination_1.DataWithPagination)({ items: commentWithUsers, meta: meta });
    return dataWithPagination;
});
exports.CommentQueryRepository = CommentQueryRepository;
