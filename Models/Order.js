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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
const Products_1 = require("./Products");
const OrderProduct_1 = require("./OrderProduct");
let Order = class Order extends core_1.Model {
};
exports.Order = Order;
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: core_1.DataTypes.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", Object)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.DECIMAL({ precision: 10, scale: 2 }),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalQuantity", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Order.prototype, "numberOrder", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.ENUM(['Order Placed', 'Inprogress', 'Shipped', 'Delivered']),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "statusOrder", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.ENUM(['Pay', 'Cash on delivery']),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "statusOrderPay", void 0);
__decorate([
    (0, decorators_legacy_1.BelongsToMany)(() => Products_1.Product, {
        through: () => OrderProduct_1.OrderProduct,
        foreignKey: 'orderId',
        otherKey: 'productId',
    }),
    __metadata("design:type", Object)
], Order.prototype, "products", void 0);
exports.Order = Order = __decorate([
    (0, table_js_1.Table)({
        timestamps: true,
        tableName: 'orders',
    })
], Order);
