"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/Auth/authController");
const findUser_1 = require("../controller/Auth/Registration User/findUser");
const verificationUser_1 = require("../controller/Auth/Registration User/verificationUser");
const isValidUser_1 = require("../controller/Auth/Login/isValidUser");
const isValidRefreshToken_1 = require("../controller/Base Middleware/isValidRefreshToken");
const updateAccessToken_1 = require("../controller/Base Middleware/updateAccessToken");
const ValidMiddleware_1 = require("../controller/Base Middleware/ValidMiddleware");
const authRoutes = (0, express_1.Router)();
authRoutes.get('/auth/getToken', isValidRefreshToken_1.isValidRefreshToken, updateAccessToken_1.updateAccessToken, ValidMiddleware_1.ValidMiddleware);
//
//===================== REGISTRATION USER  ===================
//
// find user - если пользователь не найде в БД, то выполняем переход к регистрации пользователя.
// через промежуточное программное обеспечение registrationUser,
// далее создаём токен refresh token and access token.
// далее если все ок отправляем на почту ссылку для подтверждения email
authRoutes.post('/user/registration', findUser_1.findUser, authController_1.registrationUser, verificationUser_1.verificationUser);
//
//=========================== ROUTER LOGIN  ==================
//
// Вход в систему: в login ищем пользователя в БД и сравниваем введёный пароль с паролем в БД,
// если успешно, ищем refresh token в БД, если его нет создаем новый записываем в БД
authRoutes.post('/auth/login', isValidUser_1.isValidUser, authController_1.login);
//
//=========================== ROUTER LOGOUT  ==================
//
// Вход в систему: в login ищем пользователя в БД и сравниваем введёный пароль с паролем в БД,
// если успешно, ищем refresh token в БД, если его нет создаем новый записываем в БД
authRoutes.post('/auth/logOut', authController_1.logOut);
exports.default = authRoutes;
