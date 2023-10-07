"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.login = exports.registrationUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Guid_1 = __importDefault(require("../../utils/Guid"));
const User_1 = require("../../Models/User");
const Token_1 = require("../../Models/Token");
const token_1 = require("../../utils/token");
//#region REGISTRATION USER
// ====================== REGISTRATION USER =============
const registrationUser = async (req, res, next) => {
    const activationLink = (0, Guid_1.default)();
    const user = {
        isActivated: false,
        activationLink: activationLink,
        email: req.body.email,
        username: req.body.email,
        password: req.body.password ? await bcryptjs_1.default.hash(req.body.password, 10) : '',
        phone: '',
    };
    //
    try {
        const createUser = await User_1.User.create({
            ...user,
            uid: (0, Guid_1.default)(),
        });
        const { accessToken, refreshToken, accessTokenLife, refreshTokenLife } = (0, token_1.generateTokens)({
            id: createUser.uid,
            isAuthenticated: true,
        });
        await Token_1.Token.create({
            refreshToken: refreshToken,
            userId: createUser.uid,
        })
            .then((newToken) => {
            req.body = {
                email: createUser.email,
                password: '',
                activationLink: activationLink,
                refreshToken: refreshToken,
                accessToken: accessToken,
                accessTokenLife: accessTokenLife,
                refreshTokenLife: refreshTokenLife,
            };
        })
            .then(() => {
            next(); // => verificationUser send to email
        });
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
};
exports.registrationUser = registrationUser;
//#endregion REGISTRATION USER
//#region LOGIN
//
// ======================== LOGIN USER ===============
//
const login = async (req, res, next) => {
    const userId = req.userId;
    const email = req.email;
    if (userId && email) {
        // Генерируем пару токенов Refresh , Access
        const { accessToken, accessTokenLife, refreshToken, refreshTokenLife } = (0, token_1.generateTokens)({
            id: userId,
            isAuthenticated: true,
        });
        // Ищем Refresh токен в БД
        await Token_1.Token.findOne({
            where: {
                userId: userId,
            },
        })
            .then(async (token) => {
            // Если найден, то обновляем его в БД
            if (token) {
                token.set('refreshToken', refreshToken);
                return await token.save();
            }
            // Если не найден, то создаём его в БД
            if (!token) {
                await Token_1.Token.create({
                    userId: userId,
                    refreshToken: refreshToken,
                });
            }
        })
            .then((_token) => {
            console.log('update : ', accessToken);
            res
                .cookie('accessToken', accessToken, {
                maxAge: +accessTokenLife * 1000,
                path: '/',
                httpOnly: true,
            })
                // Устанавливаем   время жизни cookie из времени жизни токена
                .cookie('refreshToken', refreshToken, {
                maxAge: Number(refreshTokenLife),
                path: '/',
                httpOnly: true,
            })
                .json({ status: 200, userId: userId, email: email });
        })
            .catch((err) => {
            console.log('Error do not update Token in authController, function login(0) :', err);
            // return res.status(401).send({ success: false, message: 'Unauthorized!' })
        });
    }
    else {
        return res.status(401).json({ message: 'Invalid username or password!' });
    }
};
exports.login = login;
//#endregion LOGIN
const logOut = async (req, res, next) => {
    const userId = req.body;
    if (userId) {
        const getPromise = async () => {
            return await Token_1.Token.findOne({
                where: { userId: userId },
            }).then(async (findToken) => {
                if (findToken) {
                    return await findToken.destroy();
                }
                return null;
            });
        };
        await getPromise().then(() => {
            return (res
                .status(200)
                // Устанавливаем 1 минута время жизни cookie
                .cookie('accessToken', '', {
                maxAge: 0,
                httpOnly: true,
            })
                // Устанавливаем 30 дней время жизни cookie
                .cookie('refreshToken', '', {
                maxAge: 0,
                httpOnly: true,
            })
                .json({ message: 'ok' }));
        });
    }
};
exports.logOut = logOut;
