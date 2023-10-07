"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@sequelize/core");
const User_1 = require("./Models/User");
const dotenv_1 = __importDefault(require("dotenv"));
const Token_1 = require("./Models/Token");
const UserProduct_1 = require("./Models/UserProduct");
const Products_1 = require("./Models/Products");
const Category_1 = __importDefault(require("./Models/Category"));
const SubCategory_1 = __importDefault(require("./Models/SubCategory"));
const Profile_1 = __importDefault(require("./Models/Profile"));
const SubCategoryAdditions_1 = __importDefault(require("./Models/SubCategoryAdditions"));
const DeliveryAddress_1 = __importDefault(require("./Models/DeliveryAddress"));
const FavoriteProducts_1 = __importDefault(require("./Models/FavoriteProducts"));
const Order_1 = require("./Models/Order");
const OrderProduct_1 = require("./Models/OrderProduct");
dotenv_1.default.config();
const connection = new core_1.Sequelize('database', 'username', 'password', {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATA_BASE,
    dialect: 'mysql',
    models: [
        User_1.User,
        UserProduct_1.UserProduct,
        DeliveryAddress_1.default,
        Token_1.Token,
        Products_1.Product,
        Category_1.default,
        SubCategory_1.default,
        SubCategoryAdditions_1.default,
        FavoriteProducts_1.default,
        Profile_1.default,
        Order_1.Order,
        OrderProduct_1.OrderProduct,
    ],
    port: 3306,
});
exports.default = connection;
