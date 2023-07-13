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
exports.commentCollection = exports.userCollection = exports.postCollection = exports.blogCollection = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const controller_1 = __importDefault(require("./controller"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
if (!process.env.PORT) {
    console.log(`Error to get ports`);
    process.exit(1);
}
const PORT = parseInt(process.env.PORT);
const app = (0, express_1.default)();
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error('MONGO URI IS INVALID');
}
const client = new mongodb_1.MongoClient(mongoURI);
const blogDB = client.db('blogs');
const postDB = client.db('posts');
const userDB = client.db('users');
const commentDB = client.db('comment');
exports.blogCollection = blogDB.collection('blogs');
exports.postCollection = postDB.collection("posts");
exports.userCollection = userDB.collection('users');
exports.commentCollection = commentDB.collection("comment");
app.use(body_parser_1.default.json());
// app.post('*', AuthMiddleware);
// app.put('*', AuthMiddleware);
app.use('/api', controller_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    app.listen(PORT || 3333, () => {
        console.log(`Server started on port ${PORT}`);
    });
});
start();
