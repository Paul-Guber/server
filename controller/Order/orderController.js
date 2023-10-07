"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderProducts = exports.getOrders = exports.addOrderUser = void 0;
const Order_1 = require("../../Models/Order");
const UserProduct_1 = require("../../Models/UserProduct");
const OrderProduct_1 = require("../../Models/OrderProduct");
const random_1 = __importDefault(require("../../utils/random"));
const Products_1 = require("../../Models/Products");
//
//===============    ADD ORDER  ======================
//
const addOrderUser = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const { deliveryAddressId, isPay } = req.body;
    const userId = req.userId;
    console.log('addOrderUser userId: ', userId);
    //
    if (userId && deliveryAddressId && isPay) {
        try {
            // Ищем все товары в корзине, возвращается массив с товарами в корзине и кол-во товаров
            const findUserCart = await UserProduct_1.UserProduct.findAndCountAll({
                where: {
                    userId: userId,
                },
            });
            const { rows, count } = findUserCart;
            //  Считаем общую сумму всех товаров
            const totalPrice = rows.reduce((prev, curr, i) => +prev + +curr.product_summary, 0);
            // Создаём заказ
            const createOrder = await Order_1.Order.create({
                userId: userId,
                statusOrderPay: isPay ? 'Pay' : 'Cash on delivery',
                statusOrder: 'Order Placed',
                totalPrice: totalPrice,
                totalQuantity: count,
                numberOrder: (0, random_1.default)(1, 99999),
            });
            const orderProducts = [];
            rows.map((product) => {
                return orderProducts.push({
                    deliveryAddressId: deliveryAddressId,
                    orderId: createOrder.orderId,
                    product_summary: product.product_summary,
                    product_quality: product.product_quality,
                    productId: product.productId,
                });
            });
            await OrderProduct_1.OrderProduct.bulkCreate(orderProducts);
            // Удаляем данные из корзины
            await UserProduct_1.UserProduct.destroy({
                where: {
                    userId: userId,
                },
            });
            return res.status(200).json({ status: 200, message: undefined, data: undefined, isMessage: false });
        }
        catch (error) {
            console.log('Error in orderController, addOrderUser: ', error);
            return res.status(200).json({ status: 404, message: '', data: undefined, isMessage: true });
        }
    }
    else {
        console.log('Errors in orderController, addOrderUser: userId: ', userId, 'deliveryAddressId: ', deliveryAddressId, 'isPay: ', isPay);
    }
    return res.status(200).json({
        status: 404,
        message: 'Error! Please enter the delivery address!',
        data: undefined,
        isMessage: true,
    });
    // Error! Please enter the delivery address!
};
exports.addOrderUser = addOrderUser;
//
// =====================   GET ORDERS   ===================
//
const getOrders = async (
// req: Request,
req, res, next) => {
    console.log('cookie refreshToken: ', req.cookies.refreshToken);
    const userId = req.userId;
    const { limit, pageNumber } = req.query;
    const numberLimit = +limit !== 0 ? +limit : 1;
    const numberPage = pageNumber;
    if (userId && numberLimit && !isNaN(numberLimit) && numberPage && !isNaN(numberPage)) {
        console.log('getOrders numberPage: ', numberPage);
        console.log('getOrders numberLimit: ', numberLimit);
        await Order_1.Order.findAndCountAll({
            where: {
                userId: userId,
            },
            limit: +numberLimit,
            offset: +numberPage,
            subQuery: false,
            order: [['createdAt', 'DESC']],
        })
            .then(({ rows, count }) => {
            return res.status(200).json({ data: rows, count: count, status: 200 });
        })
            .catch((err) => {
            console.log('Error in OrderController, getOrders: ', err);
            return res.status(404).json({ data: [], status: 404 });
        });
    }
};
exports.getOrders = getOrders;
//
// =====================   GET ORDER Products   ===================
//
const getOrderProducts = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const userId = req.userId;
    const orderId = req.query.orderId;
    if (userId && orderId) {
        try {
            const orderProduct = await Order_1.Order.findOne({
                nest: false,
                where: {
                    orderId: orderId,
                },
                include: [
                    {
                        model: Products_1.Product,
                        required: true,
                    },
                ],
                order: [[Products_1.Product, 'product_tittle', 'ASC']],
            });
            if (orderProduct && orderProduct.products) {
                const newData = [];
                const result = orderProduct.products;
                return res.status(200).json({ data: result, status: 200 });
            }
            else {
                console.log('Products not found! in orderController, getOrderProducts: ', 'orderProduct', orderProduct, 'orderProduct.products: ', orderProduct?.products);
                return res.status(404);
            }
        }
        catch (error) {
            console.log('Error in orderController, getOrderProducts: ', error);
        }
    }
};
exports.getOrderProducts = getOrderProducts;
