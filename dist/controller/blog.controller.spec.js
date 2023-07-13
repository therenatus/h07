"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_spec_1 = require("../service/blog.spec");
const router = express_1.default.Router();
const service = new blog_spec_1.Test();
router.delete("/all-data", service.deleteAll);
exports.default = router;
