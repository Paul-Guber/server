"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByDeliveryBoolean = void 0;
const DeliveryAddress_1 = __importDefault(require("../../../Models/DeliveryAddress"));
const core_1 = require("@sequelize/core");
const FindByDeliveryBoolean = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const { id, isHome, isShipping } = req.body;
    const userId = req.userId;
    if (id && userId) {
        await DeliveryAddress_1.default.findAll({
            where: {
                userId: userId,
                [core_1.Op.or]: {
                    isHome: isHome ? isHome : false,
                    isShipping: isShipping ? isShipping : false,
                },
            },
        })
            .then((find) => {
            if (find) {
                return find.map(async (item) => {
                    return await item.update({
                        isHome: isHome && !isHome,
                        isShipping: isShipping && !isShipping,
                    });
                });
            }
        })
            .then((data) => {
            next();
        });
    }
};
exports.FindByDeliveryBoolean = FindByDeliveryBoolean;
