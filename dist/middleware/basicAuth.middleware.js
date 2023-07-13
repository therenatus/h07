"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthMiddleware = void 0;
const validUsername = 'admin';
const validPassword = 'qwerty';
const BasicAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Basic ')) {
        try {
            const credentials = atob(authHeader.slice(6));
            const [username, password] = credentials.split(':');
            if (username === validUsername && password === validPassword) {
                return next();
            }
            else {
                res.status(401).send('Invalid Token');
            }
        }
        catch (_a) {
            res.status(401).send('Invalid Token');
        }
    }
    res.setHeader('WWW-Authenticate', 'Basic realm="Authentication Required"');
    res.status(401).send('Authentication Required');
};
exports.BasicAuthMiddleware = BasicAuthMiddleware;
