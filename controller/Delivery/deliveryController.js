"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDelivery = exports.updateDeliveryBoolean = exports.addDeliveryInfo = exports.addDeliveryAccount = exports.getDeliveryInfo = exports.getDeliveryAccount = void 0;
const DeliveryAddress_1 = __importDefault(require("../../Models/DeliveryAddress"));
const Guid_1 = __importDefault(require("../../utils/Guid"));
// ============== get Delivery Account ============================
const getDeliveryAccount = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res) => {
    const userId = req.userId;
    if (userId) {
        const findAddress = await DeliveryAddress_1.default.findOne({
            raw: true,
            where: {
                userId: userId,
                isHome: true,
            },
        });
        if (findAddress) {
            return res.status(200).json({ ...findAddress });
        }
        else {
            res.json(undefined);
        }
    }
    else {
        console.log('Error getUserInfo cannot req.query.userId!');
        return res.status(500);
    }
};
exports.getDeliveryAccount = getDeliveryAccount;
// ============== get Delivery Info ============================
const getDeliveryInfo = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res) => {
    const userId = req.userId;
    if (userId) {
        const findAddress = await DeliveryAddress_1.default.findAll({
            where: {
                userId: userId,
            },
        });
        if (findAddress) {
            return res.status(200).json(findAddress);
        }
        else {
            res.json(undefined);
        }
    }
    else {
        console.log('Error getUserInfo cannot req.query.userId!');
        return res.status(500);
    }
};
exports.getDeliveryInfo = getDeliveryInfo;
// ============== add Delivery Account ============================
const addDeliveryAccount = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const { id } = req.body;
    const userId = req.userId;
    // Если id = false- то что отображается в Check Out form, то создаём информацию о доставке
    if (!id && userId) {
        await DeliveryAddress_1.default.create({
            ...req.body,
            id: (0, Guid_1.default)(),
            userId: userId,
            companyName: req.body.companyName,
            suite: req.body.suite,
            isHome: req.body.isHome ? req.body.isHome : false,
            isShipping: req.body.isShipping ? req.body.isShipping : false,
        })
            .then((create) => {
            return res.status(200).json({
                data: create,
                status: 200,
                isMessage: true,
                message: 'Your billing details has been successfully saved!',
            });
        })
            .catch((err) => {
            console.log('Error in addDeliveryAccount, do not create delivery address: ', err);
        });
    }
    if (req.body && id && userId) {
        await DeliveryAddress_1.default.findByPk(id).then(async (find) => {
            if (find) {
                await find
                    .update({
                    ...req.body,
                    isHome: req.body.isHome,
                    isShipping: req.body.isShipping ? req.body.isShipping : false,
                })
                    .then(() => {
                    return res.status(200).json({
                        data: find,
                        status: 201,
                        isMessage: true,
                        message: 'Your billing details has been successfully updated!',
                    });
                })
                    .catch((err) => {
                    console.log('Error in addDeliveryAccount, in find.update: ', err);
                });
            }
            else {
                return res.status(200).json({ data: [], message: 'error', status: 404 });
            }
        });
    }
    if (!req.body) {
        console.log('Error in addDeliveryAccount, req.body = undefined!');
        return res.status(500);
    }
};
exports.addDeliveryAccount = addDeliveryAccount;
// ============== add Delivery Info ============================
const addDeliveryInfo = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const userId = req.userId;
    // Если id = false- то что отображается в Check Out form, то создаём информацию о доставке
    if (userId) {
        console.log('addDeliveryInfo', userId);
        await DeliveryAddress_1.default.create({
            ...req.body,
            userId: userId,
            companyName: req.body.companyName,
            suite: req.body.suite,
            isHome: req.body.isHome ? req.body.isHome : false,
            isShipping: req.body.isShipping ? req.body.isShipping : false,
        })
            .then((create) => {
            return res.status(200).json({
                data: create,
                status: 200,
                isMessage: true,
                message: 'Your address has been successfully saved!',
            });
        })
            .catch((err) => {
            console.log('Error in addDeliveryInfo, do not create delivery address: ', err);
            return res.status(200).json({
                data: [],
                status: 200,
                isMessage: true,
                message: 'Error, do not create address,so your address do not saved',
            });
        });
    }
    if (!req.body) {
        console.log('Error in addUserInfo, req.body = undefined!');
        return res.status(500);
    }
};
exports.addDeliveryInfo = addDeliveryInfo;
//
// ===================  UPDATE DELIVERY SHIPPING =======================
//
const updateDeliveryBoolean = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const { id, isHome, isShipping } = req.body;
    const userId = req.userId;
    // Если id = false- то что отображается в Check Out form, то создаём информацию о доставке
    console.log('updateDeliveryBoolean');
    await DeliveryAddress_1.default.findOne({
        where: {
            userId: userId,
            id: id,
        },
    })
        .then(async (find) => {
        if (find) {
            return await find.update({
                isHome: isHome ? isHome : find.isHome,
                isShipping: isShipping ? isShipping : find.isShipping,
            });
        }
    })
        .then((data) => {
        if (data) {
            return res.status(200).json({ ...data, message: 'updateSuccess' });
        }
        else {
            return res.json(undefined);
        }
    });
    if (!req.body) {
        console.log('Error in addUserInfo, req.body = undefined!');
        return res.status(500);
    }
};
exports.updateDeliveryBoolean = updateDeliveryBoolean;
const deleteDelivery = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const { id } = req.body;
    const userId = req.userId;
    if (userId && id) {
        console.log('deleteDelivery: ', id);
        await DeliveryAddress_1.default.findOne({
            where: {
                userId: userId,
                id: id,
            },
        }).then(async (find) => {
            if (find) {
                await find.destroy();
            }
            return res.json(undefined);
        });
    }
};
exports.deleteDelivery = deleteDelivery;
