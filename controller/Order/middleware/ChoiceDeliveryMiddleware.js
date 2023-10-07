"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoiceDeliveryMiddleware = void 0;
const DeliveryAddress_1 = __importDefault(require("../../../Models/DeliveryAddress"));
const core_1 = require("@sequelize/core");
const ChoiceDeliveryMiddleware = async (req, 
// req: Request<any, any, IUser, any, Record<string, IUser>>,
res, next) => {
    const { delivery } = req.body;
    const userId = req.userId;
    if (userId && delivery) {
        await DeliveryAddress_1.default.findOne({
            where: {
                userId: userId,
                [core_1.Op.or]: {
                    isHome: delivery === 'isHome' ? true : false,
                    isShipping: delivery === 'isShipping' ? true : false,
                },
            },
        }).then((findAddress) => {
            if (findAddress) {
                req.body.deliveryAddressId = findAddress.id;
                next();
            }
            else {
                console.log('findAddress not found in ChoiceDeliveryMiddleware: ', findAddress);
                return res.status(200).json({
                    isMessage: true,
                    message: 'Error! Please enter the delivery address!',
                    status: 404,
                });
            }
        });
    }
    else {
        console.log('Error in ChoiceDeliveryMiddleware', 'userId: ', userId, 'delivery: ', delivery);
    }
};
exports.ChoiceDeliveryMiddleware = ChoiceDeliveryMiddleware;
