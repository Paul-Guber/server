"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUser = void 0;
const User_1 = require("../../../Models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const isValidUser = async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        console.log('email undefined in isValidUser ');
        // return res.json({ message: 'fail' })
    }
    // Ищем пользователя в БД
    const findUser = await User_1.User.findOne({
        where: { email: email },
        attributes: ['password', 'email', 'uid'],
    });
    // Если пользователя нет в БД, тогда возвращаем ответ Not Found status 404
    if (!findUser) {
        return res.status(404).json({ message: 'Invalid username or password!' });
    }
    // Далее проверяем пароль, совпадает или нет с hash паролем пользователя
    const isValidPassword = await bcryptjs_1.default.compare(req.body.password, findUser.password);
    // Если не совпадает возвращаем такую же ошибку Not Found status 404
    if (!isValidPassword) {
        return res.status(404).json({ message: 'Invalid username or password!' });
    }
    // Если прошли все проверки успешно, вызываем next()
    req.email = findUser.email;
    req.userId = findUser.uid;
    next();
};
exports.isValidUser = isValidUser;
