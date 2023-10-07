"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUser = void 0;
const User_1 = require("../../../Models/User");
const findUser = async (req, res, next) => {
    if (!req.body)
        return res.status(401).json({ message: 'No data available!' });
    const findUser = await User_1.User.findOne({ where: { email: req.body.email } });
    if (findUser) {
        return res.status(403).json({ message: 'The username is already busy!' });
    }
    next();
};
exports.findUser = findUser;
