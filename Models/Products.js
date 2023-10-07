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
exports.Product = void 0;
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const SubCategoryAdditions_1 = __importDefault(require("./SubCategoryAdditions"));
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
let Product = class Product extends core_1.Model {
};
exports.Product = Product;
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: core_1.DataTypes.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", Object)
], Product.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "product_sku", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "product_tittle", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "product_metaTittle", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Product.prototype, "product_price", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "product_discount", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.TEXT('long'),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "product_description", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "image_product", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "product_badge", void 0);
__decorate([
    (0, decorators_legacy_1.HasMany)(() => SubCategoryAdditions_1.default, {
        foreignKey: 'productId',
    }),
    __metadata("design:type", Object)
], Product.prototype, "subCategoryAdditions", void 0);
exports.Product = Product = __decorate([
    (0, table_js_1.Table)({
        timestamps: true,
        tableName: 'products',
    })
], Product);
