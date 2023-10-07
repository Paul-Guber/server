"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validUserIdMiddleware_1 = __importDefault(require("../utils/validUserIdMiddleware"));
const profileController_1 = require("../controller/Profile/profileController");
const isValidRefreshToken_1 = require("../controller/Base Middleware/isValidRefreshToken");
const updateAccessToken_1 = require("../controller/Base Middleware/updateAccessToken");
const profileRoutes = (0, express_1.Router)();
profileRoutes.get('/profile/getProfile', isValidRefreshToken_1.isValidRefreshToken, updateAccessToken_1.updateAccessToken, validUserIdMiddleware_1.default, profileController_1.getProfile);
profileRoutes.post('/profile/addUpdate', isValidRefreshToken_1.isValidRefreshToken, updateAccessToken_1.updateAccessToken, validUserIdMiddleware_1.default, profileController_1.updateProfile);
exports.default = profileRoutes;
