"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = exports.generateAccessToken = exports.refreshPrivateKey = exports.privateKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
dotenv_1.default.config();
exports.privateKey = Buffer.from(process.env.ACCESS_TOKEN_ACCESS_KEY, 'base64').toString('ascii');
exports.refreshPrivateKey = Buffer.from(process.env.ACCESS_TOKEN_REFRESH_KEY, 'base64').toString('ascii');
//
// ============================ GENERATE ACCESS TOKEN ===============
//
const generateAccessToken = (payload) => {
    return {
        accessToken: jsonwebtoken_1.default.sign({ ...payload }, exports.privateKey, {
            expiresIn: +process_1.env.ACCESS_TOKEN_LIFE,
        }),
        accessTokenLife: +process_1.env.ACCESS_TOKEN_LIFE,
    };
};
exports.generateAccessToken = generateAccessToken;
//
//  =================   GENERATE TOKENS ACCESS AND REFRESH =================
//
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, exports.privateKey, {
        expiresIn: process?.env?.ACCESS_TOKEN_LIFE,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, exports.refreshPrivateKey, {
        expiresIn: process_1.env.REFRESH_TOKEN_LIFE,
    });
    return {
        refreshToken,
        accessToken,
        accessTokenLife: process?.env?.ACCESS_TOKEN_LIFE,
        refreshTokenLife: process?.env?.REFRESH_TOKEN_LIFE,
    };
};
exports.generateTokens = generateTokens;
