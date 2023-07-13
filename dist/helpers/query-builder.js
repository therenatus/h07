"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const QueryBuilder = (query) => {
    const QuerySearch = {
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null,
        pageSize: query.pageSize ? +query.pageSize : 10,
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        sortDirection: query.sortDirection ? query.sortDirection : 'desc',
        sortBy: query.sortBy ? query.sortBy : 'createdAt'
    };
    return QuerySearch;
};
exports.QueryBuilder = QueryBuilder;
