"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationUser = void 0;
const SendEmail_1 = __importDefault(require("../../../utils/SendEmail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verificationUser = async (req, res) => {
    if (!req.body)
        return res.status(500);
    try {
        const { email, activationLink, accessToken, accessTokenLife, refreshToken, refreshTokenLife } = req.body;
        await (0, SendEmail_1.default)(req.body.email, `${process.env.CLIENT_URL}/#/mailActivation/${activationLink}`);
        return (res
            .status(200)
            // Устанавливаем 1 минута время жизни cookie
            .cookie('accessToken', accessToken, {
            maxAge: Number(accessTokenLife),
            httpOnly: true,
        })
            // Устанавливаем 30 дней время жизни cookie
            .cookie('refreshToken', refreshToken, {
            maxAge: Number(refreshTokenLife),
            httpOnly: true,
        })
            .json({ message: 'ok' }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Fail to send email!' });
    }
};
exports.verificationUser = verificationUser;
