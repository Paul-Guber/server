"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const UserProduct_1 = require("./UserProduct");
const Token_1 = require("./Token");
const Profile_1 = __importDefault(require("./Profile"));
const Products_1 = require("./Products");
const DeliveryAddress_1 = __importDefault(require("./DeliveryAddress"));
const FavoriteProducts_1 = __importDefault(require("./FavoriteProducts"));
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
const Order_1 = require("./Order");
let User = class User extends core_1.Model {
};
exports.User = User;
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: core_1.DataTypes.UUIDV4,
    }),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, decorators_legacy_1.Index)({
        unique: true,
        type: 'UNIQUE',
        name: 'email',
    }),
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "activationLink", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivated", void 0);
__decorate([
    (0, decorators_legacy_1.HasOne)(() => Token_1.Token, {
        foreignKey: 'userId',
    }),
    __metadata("design:type", Object)
], User.prototype, "token", void 0);
__decorate([
    (0, decorators_legacy_1.BelongsToMany)(Products_1.Product, {
        through: () => UserProduct_1.UserProduct,
        foreignKey: { name: 'userId' },
        otherKey: { name: 'productId' },
    }),
    __metadata("design:type", Array)
], User.prototype, "ProductUser", void 0);
__decorate([
    (0, decorators_legacy_1.HasMany)(() => Order_1.Order, {
        foreignKey: 'userId',
    }),
    __metadata("design:type", Object)
], User.prototype, "orders", void 0);
__decorate([
    (0, decorators_legacy_1.HasMany)(() => DeliveryAddress_1.default, {
        foreignKey: 'userId',
    }),
    __metadata("design:type", Object)
], User.prototype, "delivery", void 0);
__decorate([
    (0, decorators_legacy_1.HasOne)(() => Profile_1.default, 'userId'),
    __metadata("design:type", Object)
], User.prototype, "profile", void 0);
__decorate([
    (0, decorators_legacy_1.BelongsToMany)(() => Products_1.Product, {
        through: () => FavoriteProducts_1.default,
        inverse: {
            as: 'users',
        },
        foreignKey: 'userId',
        otherKey: 'productId',
    }),
    __metadata("design:type", Object)
], User.prototype, "products", void 0);
exports.User = User = __decorate([
    (0, table_js_1.Table)({
        timestamps: true,
        tableName: 'users',
    })
    // implements IUser
], User);
// User.belongsToMany(Product, {
// 	through: UserProduct,
// 	as: 'usersProducts',
// 	foreignKey: 'userId',
// })
