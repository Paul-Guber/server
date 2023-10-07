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
exports.isAccessTokenMiddleware = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = require("../../utils/token");
const User_1 = require("../../Models/User");
dotenv_1.default.config();
const isAccessTokenMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.accessToken + '';
    try {
        console.log('accessToken: ', accessToken);
        jsonwebtoken_1.default.verify(accessToken, token_1.privateKey, { complete: true }, async (err, decoded) => {
            console.log('Errors', err);
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                return res
                    .status(401)
                    .send({ success: false, message: 'Unauthorized! Access Token was expired!' });
            }
            if (err instanceof jsonwebtoken_1.NotBeforeError) {
                return res.status(401).send({ success: false, message: 'jwt not active' });
            }
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return res.status(401).send({ success: false, message: 'jwt malformed' });
            }
            if (err === null) {
                console.log('Not Error the Token: ', err);
                if (decoded) {
                    const id = decoded.payload.id.toString();
                    await User_1.User.findOne({
                        where: {
                            uid: id,
                        },
                    }).then((user) => {
                        if (!user) {
                            console.log('user not found! in isAccessTokenMiddleware');
                        }
                        else {
                            req.email = user.email;
                            req.userId = user.uid;
                            next();
                        }
                    });
                }
                else {
                    console.log('error no email in decoded token! isAccessTokenMiddleware');
                    return res.status(404).send({});
                }
            }
        });
        // 	const isJWTExpired = (  decodedToken: JwtPayload): boolean => {
        // 		const expiresAt: Date = decodedToken.getExpiresAt();
        // 		return expiresAt.before(new Date());
        // }
    }
    catch (err) {
        // ...
    }
};
exports.isAccessTokenMiddleware = isAccessTokenMiddleware;
