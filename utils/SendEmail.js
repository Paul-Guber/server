"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendMail = async (to, link) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
    });
    return await transporter.sendMail({
        from: process.env.SMTP_TEST_MAIL,
        to,
        subject: 'Subject account Ecommerce' + process.env.API_URL,
        text: '',
        html: `
							<div>
							<h2>For activation your account, send to link</h2>
							<a href="${link}">${link}</a>
							</div>
							`,
    });
};
exports.default = sendMail;
