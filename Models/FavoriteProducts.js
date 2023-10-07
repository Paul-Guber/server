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
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
const decorators_legacy_1 = require("@sequelize/core/decorators-legacy");
let FavoriteProducts = class FavoriteProducts extends core_1.Model {
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
], FavoriteProducts.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], FavoriteProducts.prototype, "like", void 0);
FavoriteProducts = __decorate([
    (0, table_js_1.Table)({
        timestamps: false,
        tableName: 'favoriteProducts',
    })
], FavoriteProducts);
exports.default = FavoriteProducts;
