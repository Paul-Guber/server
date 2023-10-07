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
const core_1 = require("@sequelize/core");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
const Products_1 = require("./Products");
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
let SubCategory = class SubCategory extends core_1.Model {
};
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        defaultValue: core_1.DataTypes.UUIDV4,
    }),
    __metadata("design:type", Object)
], SubCategory.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "subCategoryName", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], SubCategory.prototype, "subCategoryImgLink", void 0);
__decorate([
    (0, decorators_legacy_1.HasMany)(() => Products_1.Product, 'sub_categoryId'),
    __metadata("design:type", Object)
], SubCategory.prototype, "products", void 0);
SubCategory = __decorate([
    (0, table_js_1.Table)({
        timestamps: false,
        tableName: 'sub_categories',
    })
], SubCategory);
exports.default = SubCategory;
