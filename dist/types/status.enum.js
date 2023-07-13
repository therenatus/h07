"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusEnum[StatusEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusEnum[StatusEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusEnum[StatusEnum["NOT_CONTENT"] = 204] = "NOT_CONTENT";
    StatusEnum[StatusEnum["SUCCESS"] = 200] = "SUCCESS";
    StatusEnum[StatusEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusEnum[StatusEnum["CREATED"] = 201] = "CREATED";
    StatusEnum[StatusEnum["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
