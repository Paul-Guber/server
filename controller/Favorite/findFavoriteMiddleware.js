"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFavoriteMiddleware = void 0;
const FavoriteProducts_1 = __importDefault(require("../../Models/FavoriteProducts"));
const findFavoriteMiddleware = async (req, res, next) => {
    if (req.body.productId && req.userId) {
        const id = req.userId;
        const productId = req.body.productId;
        const findFavorite = await FavoriteProducts_1.default.findOne({
            where: { userId: id, productId: productId },
        });
        if (findFavorite) {
            const newData = [];
            await findFavorite.destroy().then(async (data) => {
                return res.status(200).json({
                    message: 'favoriteDelete',
                    status: 200,
                    data: newData,
                });
            });
        }
        if (!findFavorite) {
            next();
        }
    }
};
exports.findFavoriteMiddleware = findFavoriteMiddleware;
