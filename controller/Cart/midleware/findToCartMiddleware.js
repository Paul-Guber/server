"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findToCartMiddleware = void 0;
const UserProduct_1 = require("../../../Models/UserProduct");
const console_1 = require("console");
const Products_1 = require("../../../Models/Products");
const findToCartMiddleware = async (req, res, next) => {
    // если есть данные в запросе, то
    const userId = req.userId;
    const { productId } = req.body;
    if (userId && productId) {
        // ищем товар в корзине по id
        const productCart = await UserProduct_1.UserProduct.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        });
        if (productCart) {
            const findProduct = await Products_1.Product.findOne({
                attributes: ['product_price'],
                where: {
                    id: productId,
                },
            });
            req.body.price = findProduct?.product_price;
            req.body.cartProduct = productCart;
            next();
        }
        else {
            console.log('Error in findToCartMiddleware, product not found: ', console_1.error);
            return res.status(404);
        }
    }
    else {
        console.log('productId: ', productId);
        console.log('userId: ', userId);
        console.log('Error in findToCartMiddleware, productId or userId === undefined:');
        return res.status(404);
    }
};
exports.findToCartMiddleware = findToCartMiddleware;
