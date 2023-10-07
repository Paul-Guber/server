"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavoriteProduct = exports.getAllFavoriteProducts = exports.addFavoriteProduct = void 0;
const FavoriteProducts_1 = __importDefault(require("../../Models/FavoriteProducts"));
const Products_1 = require("../../Models/Products");
//
// ================ ADD FAVORITE =========================
//
const addFavoriteProduct = async (req, res) => {
    const userId = req.userId;
    const { productId } = req.body;
    await FavoriteProducts_1.default.create({
        userId: userId,
        productId: productId,
        like: true,
    }).then((data) => {
        return res.status(200).json({ data: data, status: 200, message: 'addFavorite' });
    });
};
exports.addFavoriteProduct = addFavoriteProduct;
// ===================== GET ALL FAVORITES =========================
const getAllFavoriteProducts = async (req, res) => {
    if (req.userId) {
        const userId = req.userId;
        const products = [];
        const favorite = await FavoriteProducts_1.default.findAll({
            raw: true,
            where: {
                userId: userId,
            },
        });
        Promise.all(favorite.map(async (favoriteItem) => {
            return await Products_1.Product.findOne({
                raw: true,
                plain: true,
                where: {
                    id: favoriteItem.productId,
                },
            });
        }))
            .then((data) => {
            if (data) {
                data.map((item) => {
                    return products.push(item);
                });
                return products;
            }
        })
            .then((dataProducts) => {
            return res.send({ data: dataProducts ? dataProducts : [] });
        });
    }
    else {
        return res.json({
            data: [],
            message: '',
        });
    }
};
exports.getAllFavoriteProducts = getAllFavoriteProducts;
//
// ========================== DELETE FAVORITE ======================
//
const deleteFavoriteProduct = async (req, res) => {
    const userId = req.userId;
    if (req.body.productId && userId) {
        const { productId } = req.body;
        await FavoriteProducts_1.default.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        }).then(async (favoriteProduct) => {
            if (favoriteProduct) {
                await favoriteProduct.destroy().then(() => {
                    return res.status(200).json({ data: favoriteProduct, status: 200, message: 'removeFavorite' });
                });
            }
        });
    }
};
exports.deleteFavoriteProduct = deleteFavoriteProduct;
