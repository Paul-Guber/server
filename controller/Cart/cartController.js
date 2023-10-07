"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCart = exports.variationProductCart = exports.getProductsCart = exports.addToCart = void 0;
const UserProduct_1 = require("../../Models/UserProduct");
const Products_1 = require("../../Models/Products");
const User_1 = require("../../Models/User");
//
// ======================= ADD PRODUCTS TO CART =================
//
const addToCart = async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.userId;
    if (productId && productId !== '' && userId && userId !== '') {
        productId;
        userId;
        const findCart = await UserProduct_1.UserProduct.findOne({
            where: {
                productId: productId,
                userId: userId,
            },
        });
        if (findCart) {
            return res.status(200).json({
                message: 'The product is already in the cart!',
                isMessage: true,
                status: 201,
                data: findCart,
            });
        }
        else {
            const findProduct = await Products_1.Product.findOne({
                attributes: ['product_price'],
                where: {
                    id: productId,
                },
            });
            await UserProduct_1.UserProduct.create({
                userId: userId,
                productId: productId,
                product_quality: 1,
                product_summary: findProduct?.product_price,
            })
                .then((data) => {
                return res.status(200).json({
                    message: 'The product has been successfully added to the cart',
                    isMessage: true,
                    status: 404,
                    data: data,
                });
            })
                .catch((error) => {
                console.log('error add to cart: ', error);
                return res.status(500);
            });
        }
    }
    else {
        return res.status(500);
    }
};
exports.addToCart = addToCart;
//
// ======================= GET PRODUCTS TO CART =================
//
const getProductsCart = async (req, res, next) => {
    const userId = req.userId;
    console.log('getProductsCart', userId);
    const newData = [];
    if (userId && userId !== '') {
        try {
            const findProducts = await User_1.User.findOne({
                subQuery: true,
                nest: true,
                attributes: [],
                where: {
                    uid: userId,
                },
                include: [
                    {
                        nested: true,
                        required: true,
                        association: User_1.User.associations.ProductUser,
                        through: { as: 'UserProduct', attributes: ['product_summary', 'product_quality'] },
                    },
                ],
                order: [['ProductUser', 'product_tittle']],
            });
            if (findProducts) {
                const products = findProducts?.get('ProductUser');
                products.map((item) => {
                    newData.push({
                        productId: item.id,
                        image_product: item.image_product,
                        product_badge: item.product_badge,
                        product_description: item.product_description,
                        product_discount: item.product_discount,
                        product_price: item.product_price,
                        product_sku: item.product_sku,
                        product_tittle: item.product_tittle,
                        product_quality: item.UserProduct.dataValues.product_quality,
                        product_summary: +item.UserProduct.dataValues.product_summary,
                    });
                });
                res.status(200).json({ data: newData, status: 200 });
            }
            else {
                res.status(200).json({ data: [], status: 404 });
            }
        }
        catch (error) {
            console.log('Error', error);
        }
    }
};
exports.getProductsCart = getProductsCart;
//
// ========= VARIATION ((increment +) / (decrement -)) PRODUCTS TO CART =================
//
const variationProductCart = async (req, res) => {
    const { variation, cartProduct, price } = req.body;
    const cartQuantity = +cartProduct.product_quality <= 1 ? 1 : +cartProduct.product_quality;
    console.log(cartQuantity);
    const quantity = variation === 'increment' ? cartQuantity + 1 : cartQuantity === 1 ? 1 : cartQuantity - 1;
    const summary = price * quantity;
    const result = cartQuantity >= 1
        ? cartProduct.set({
            product_quality: quantity,
            product_summary: summary,
        })
        : '';
    await cartProduct
        .save()
        .then((cart) => {
        // return res.status(200).json(cart)
        console.log(cart);
        return res.status(200).send(cart);
    })
        .catch((error) => {
        console.log('Error in variationProductCart: ', error);
        return res.status(404);
    });
};
exports.variationProductCart = variationProductCart;
//
// ==================  DELETE PRODUCT TO CART =================
//
const deleteProductCart = async (req, res) => {
    // если есть данные в запросе, то
    const userId = req.userId;
    const { productId } = req.body;
    if (userId && productId) {
        // ищем товар в корзине по id
        await UserProduct_1.UserProduct.findOne({
            where: {
                userId: userId,
                productId: productId,
            },
        }).then(async (userProduct) => {
            if (userProduct) {
                return await userProduct.destroy().then(() => {
                    return res.status(200).json({
                        data: userProduct,
                        message: 'delete product',
                        status: 200,
                    });
                });
            }
            else {
                console.log('Error in findToCartMiddleware, product not found: ');
                return res.status(404).json({
                    data: [],
                    message: 'Fail',
                    status: 404,
                });
            }
        });
    }
    else {
        console.log('Error in findToCartMiddleware, productId or userId === undefined:');
        return res.status(404).json({
            data: [],
            message: 'Fail',
            status: 404,
        });
    }
};
exports.deleteProductCart = deleteProductCart;
