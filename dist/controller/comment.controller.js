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
const auth_middleware_1 = require("../middleware/auth.middleware");
const comment_service_1 = require("../service/comment.service");
const status_enum_1 = require("../types/status.enum");
const create_comment_validator_1 = require("./validator/create-comment.validator");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const router = express_1.default.Router();
const service = new comment_service_1.CommentService();
router.put('/:id', auth_middleware_1.AuthMiddleware, create_comment_validator_1.CreateCommentValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const comment = yield service.update(req.body, req.params.id, req.userId);
    if (comment === status_enum_1.StatusEnum.NOT_FOUND) {
        return res.status(status_enum_1.StatusEnum.NOT_FOUND).send();
    }
    if (comment === status_enum_1.StatusEnum.FORBIDDEN) {
        return res.status(status_enum_1.StatusEnum.FORBIDDEN).send();
    }
    if (comment === status_enum_1.StatusEnum.UNAUTHORIZED) {
        return res.status(status_enum_1.StatusEnum.UNAUTHORIZED).send();
    }
    res.status(status_enum_1.StatusEnum.NOT_CONTENT).send();
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    const comment = yield service.getOne(req.params.id);
    if (comment === status_enum_1.StatusEnum.NOT_FOUND) {
        return res.status(status_enum_1.StatusEnum.NOT_FOUND).send();
    }
    res.status(status_enum_1.StatusEnum.SUCCESS).send(comment);
}));
router.delete('/:id', auth_middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id) {
        return res.status(404).send();
    }
    if (!req.userId) {
        return res.status(403).send();
    }
    const comment = yield service.deleteOne(req.params.id, req.userId);
    if (comment === status_enum_1.StatusEnum.FORBIDDEN) {
        return res.status(status_enum_1.StatusEnum.FORBIDDEN).send();
    }
    if (comment === status_enum_1.StatusEnum.NOT_FOUND) {
        return res.status(status_enum_1.StatusEnum.NOT_FOUND).send();
    }
    if (comment === status_enum_1.StatusEnum.UNAUTHORIZED) {
        return res.status(status_enum_1.StatusEnum.UNAUTHORIZED).send();
    }
    res.status(status_enum_1.StatusEnum.NOT_CONTENT).send();
}));
exports.default = router;
