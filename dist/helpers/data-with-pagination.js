"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataWithPagination = void 0;
const DataWithPagination = (props) => {
    const { items, meta } = props;
    const dataWithPagination = {
        pageSize: meta.pageSize,
        page: meta.pageNumber,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: items
    };
    return dataWithPagination;
};
exports.DataWithPagination = DataWithPagination;
