"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateAccount = exports.getAuthenticatedUser = void 0;
const User_1 = require("../Models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//  =================   GET USER AFTER MIDDLEWARE  ======
const getAuthenticatedUser = async (req, res) => {
    const { email } = req.body;
    const { refreshToken, accessToken } = req.cookies;
    try {
        const user = await User_1.User.findOne({
            where: { email: email },
            attributes: ['email', 'username'],
        });
        console.log('User: ', user?.email);
        if (!user) {
            return res.status(402);
        }
        return res
            .status(200)
            .cookie('accessToken', accessToken)
            .json({ ...user });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAuthenticatedUser = getAuthenticatedUser;
// ====================== ACTIVATION LINK =========
const activateAccount = async (req, res) => {
    const user = await User_1.User.findOne({
        where: { activationLink: req.body.activationLink },
    });
    if (user) {
        user.isActivated = true;
        await user.save();
        return res.redirect(process?.env?.CLIENT_URL);
    }
};
exports.activateAccount = activateAccount;
