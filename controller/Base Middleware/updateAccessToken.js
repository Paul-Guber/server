"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = require("../../utils/token");
dotenv_1.default.config();
const updateAccessToken = async (req, res, next) => {
    console.log('UPDATE TOKEN');
    // Генерируем новый токен Access Token
    const { accessToken: generateToken, accessTokenLife } = (0, token_1.generateAccessToken)({
        id: req.userId,
        isAuthenticated: true,
    });
    res.cookie('accessToken', generateToken, {
        maxAge: +accessTokenLife * 1000,
        httpOnly: true,
        path: '/',
    });
    next();
};
exports.updateAccessToken = updateAccessToken;
