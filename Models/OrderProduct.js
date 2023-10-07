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
exports.OrderProduct = void 0;
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
let OrderProduct = class OrderProduct extends core_1.Model {
};
exports.OrderProduct = OrderProduct;
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: core_1.DataTypes.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", Object)
], OrderProduct.prototype, "OrderProductId", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "product_summary", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "product_quality", void 0);
exports.OrderProduct = OrderProduct = __decorate([
    (0, table_js_1.Table)({
        timestamps: true,
        tableName: 'detailOrders',
    })
], OrderProduct);
