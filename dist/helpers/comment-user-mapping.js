"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentUserMapping = void 0;
const CommentUserMapping = (comment, author) => {
    const { commentatorId } = comment, newComment = __rest(comment, ["commentatorId"]);
    return Object.assign(Object.assign({}, newComment), { commentatorInfo: {
            userId: author.accountData.id,
            userLogin: author.accountData.login
        } });
};
exports.CommentUserMapping = CommentUserMapping;
