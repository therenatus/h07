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
const user_service_1 = require("../service/user.service");
const create_user_validator_1 = require("./validator/create-user.validator");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const router = express_1.default.Router();
const service = new user_service_1.UserService();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, meta } = yield service.getAll(req.query);
    const users = {
        pageSize: meta.pageSize,
        page: meta.pageNumber,
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        totalCount: meta.totalCount,
        items: items
    };
    res.status(200).send(users);
}));
router.post('/', create_user_validator_1.CreateUserValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield service.create(req.body);
    if (!user) {
        return res.status(500).send('error');
    }
    res.status(201).send(user);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield service.delete(req.params.id);
    if (!data) {
        return res.status(404).send();
    }
    res.status(204).send();
}));
exports.default = router;
