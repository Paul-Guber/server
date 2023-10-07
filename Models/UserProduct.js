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
exports.UserProduct = void 0;
const core_1 = require("@sequelize/core");
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
let UserProduct = class UserProduct extends core_1.Model {
};
exports.UserProduct = UserProduct;
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: core_1.DataTypes.UUIDV4,
    }),
    __metadata("design:type", Object)
], UserProduct.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], UserProduct.prototype, "product_summary", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    }),
    __metadata("design:type", Number)
], UserProduct.prototype, "product_quality", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserProduct.prototype, "productId", void 0);
exports.UserProduct = UserProduct = __decorate([
    (0, table_js_1.Table)({
        timestamps: true,
        tableName: 'carts',
    })
], UserProduct);
