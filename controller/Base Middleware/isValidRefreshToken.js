"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRefreshToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = require("../../utils/token");
const User_1 = require("../../Models/User");
const Token_1 = require("../../Models/Token");
dotenv_1.default.config();
const isValidRefreshToken = async (req, res, next) => {
    console.log('req.cookies.refreshToken: ', req.cookies);
    if (!req.cookies.refreshToken) {
        // Здесь надо сделать перенаправление на авторизацию пользователя
        // очистить кэш
        console.log('Error in isValidRefreshToken, refreshToken === undefined', req.cookies.refreshToken);
        // return res.json({ status: 401, userId: '' })
        return res.status(200).json({ status: 401, userId: '' });
    }
    try {
        jsonwebtoken_1.default.verify(req.cookies.refreshToken, token_1.refreshPrivateKey, { complete: true }, async (err, decoded) => {
            console.log('All Errors jwt.verify in isValidRefreshToken: ', err);
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                console.log('Error in isValidRefreshToken, TokenExpiredError, message: Unauthorized! Access Token was expired! ');
                return res.status(200).json({
                    status: 401,
                    userId: '',
                });
            }
            if (err instanceof jsonwebtoken_1.NotBeforeError) {
                console.log('Error in isValidRefreshToken, NotBeforeError, message: jwt not active ');
                return res.status(200).json({ status: 401, userId: '' });
            }
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                console.log('Error in isValidRefreshToken, JsonWebTokenError, message: jwt malformed');
                return res.status(200).json({ status: 401, userId: '' });
            }
            if (err === null) {
                if (decoded?.payload) {
                    const id = decoded.payload.id;
                    await User_1.User.findOne({
                        where: {
                            uid: id,
                        },
                        attributes: ['uid', 'username', 'email'],
                        include: [Token_1.Token],
                    }).then((user) => {
                        if (!user) {
                            console.log('user not found! in isValidRefreshToken');
                            return res.status(200).json({ status: 401, userId: '' });
                        }
                        else {
                            // Ищем токен в БД
                            const token = user.get('token', { raw: true });
                            // Если токена нет в БД, то отправляем статус 401 not found
                            if (!token) {
                                console.log('Error in isValidRefreshToken Token not found!');
                                return res.status(200).json({ status: 401, userId: '' });
                            }
                            if (token) {
                                // Сравниваем хэш из БД и то что пришло из cookie,
                                // Если совпали, то вызываем next()
                                if (token.refreshToken === req.cookies.refreshToken) {
                                    req.email = user.email;
                                    req.userId = user.uid;
                                    next();
                                    // Если хэш из БД и то что пришло из cookie  не равны,
                                    // возвращаем ошибку со статусом 401 not found
                                }
                                else if (token.refreshToken !== req.cookies.refreshToken) {
                                    console.log('Error in isValidRefreshToken, token.refreshToken !== req.cookies.refreshToken!');
                                    return res.status(200).json({ status: 401, userId: '' });
                                }
                            }
                        }
                    });
                }
                else {
                    console.log('error no email in decoded token! isAccessTokenMiddleware');
                    return res.status(200).json({ status: 401, userId: '' });
                }
            }
        });
    }
    catch (error) {
        console.log('Failed to authenticate token.', error);
        // Здесь надо сделать перенаправление на авторизацию пользователя
        return res.status(200).json({ status: 401, userId: '' });
    }
};
exports.isValidRefreshToken = isValidRefreshToken;
