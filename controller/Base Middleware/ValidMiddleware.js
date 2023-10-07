"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidMiddleware = void 0;
const ValidMiddleware = async (req, res) => {
    return res.status(200).json({
        userId: req.userId,
        status: 200,
        email: req.email,
    });
};
exports.ValidMiddleware = ValidMiddleware;
