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
const auth_service_1 = require("../service/auth.service");
const login_validator_1 = require("./validator/login.validator");
const inputValidationMiddleware_1 = require("../middleware/inputValidationMiddleware");
const jwtService_1 = require("../helpers/jwtService");
const auth_middleware_1 = require("../middleware/auth.middleware");
const check_code_validator_1 = require("./validator/check-code.validator");
const check_email_validator_1 = require("./validator/check-email.validator");
const router = express_1.default.Router();
const service = new auth_service_1.AuthService();
const jwtService = new jwtService_1.JwtService();
router.post('/login', login_validator_1.LoginValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.log(`Error to get secret`);
        process.exit(1);
    }
    const data = yield service.login(req.body);
    if (!data || typeof data === "boolean") {
        return res.status(401).send('Password or login incorrect');
    }
    const token = yield jwtService.generateJwt(data.accountData.id);
    res.status(200).send({ accessToken: token });
}));
router.get('/me', auth_middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).send('Forbidden');
    }
    const user = yield service.getMe(userId);
    if (!user || typeof user === "boolean") {
        return res.status(401).send('Forbidden');
    }
    const userResponse = { userId: user.id, email: user.email, login: user.login };
    res.status(200).send(userResponse);
}));
router.post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mail = yield service.registration(req.body);
    return res.status(200).send(mail);
}));
router.post('/registration-confirmation', check_code_validator_1.CheckCodeValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isConfirm = service.confirmUser(req.body.code);
    if (!isConfirm) {
        return res.status(400).send();
    }
    return res.status(204).send();
}));
router.post('/registration-email-resending', check_email_validator_1.CheckEmailValidator, inputValidationMiddleware_1.InputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isConfirm = service.resendEmail(req.body.email);
    if (!isConfirm) {
        return res.status(400).send();
    }
    return res.status(204).send();
}));
exports.default = router;
