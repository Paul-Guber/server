"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersQuery_1 = require("../controller/usersQuery");
const isValidRefreshToken_1 = require("../controller/Base Middleware/isValidRefreshToken");
const userController_1 = require("../controller/userController");
const updateAccessToken_1 = require("../controller/Base Middleware/updateAccessToken");
const ValidMiddleware_1 = require("../controller/Base Middleware/ValidMiddleware");
const usersRouter = (0, express_1.Router)();
usersRouter.post('/user/activation', usersQuery_1.activateAccount);
// Проверяем есть у пользователя refreshToken  - isValidToken если действительный то вызываем next()
// Далее получем информацию о пользователе и токен из БД, если accessToken
usersRouter.get('/user/me', isValidRefreshToken_1.isValidRefreshToken, updateAccessToken_1.updateAccessToken, ValidMiddleware_1.ValidMiddleware);
usersRouter.delete('/user/delete', userController_1.deleteUser);
usersRouter.patch('/user/update', userController_1.updateUser);
exports.default = usersRouter;
