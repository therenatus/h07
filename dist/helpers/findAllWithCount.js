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
exports.FindAllWithCount = void 0;
//@ts-ignore
function FindAllWithCount(query, collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { searchNameTerm, sortDirection, pageSize, pageNumber, sortBy, searchEmailTerm, searchLoginTerm } = query;
        let filter = {};
        const sortOptions = {};
        sortOptions[sortBy] = sortDirection;
        const orConditions = [];
        if (searchNameTerm) {
            filter = { 'accountData.name': { $regex: searchNameTerm, $options: "i" } };
        }
        if (searchEmailTerm) {
            orConditions.push({ 'accountData.email': { $regex: searchEmailTerm, $options: "i" } });
        }
        if (searchLoginTerm) {
            orConditions.push({ 'accountData.login': { $regex: searchLoginTerm, $options: "i" } });
        }
        if (orConditions.length > 0) {
            filter.$or = orConditions;
        }
        if (id) {
            filter.accountData.blogId = id;
        }
        console.log(filter);
        const total = yield collection.countDocuments(filter);
        const data = yield collection
            .find(filter, { projection: { hashPassword: 0 } })
            .sort(sortOptions)
            .skip(+pageSize * (pageNumber - 1))
            .limit(+pageSize)
            .toArray();
        return { data: data, totalCount: total };
    });
}
exports.FindAllWithCount = FindAllWithCount;
