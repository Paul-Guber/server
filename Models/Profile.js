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
const table_js_1 = require("@sequelize/core/_non-semver-use-at-your-own-risk_/decorators/legacy/table.js");
let Profile = class Profile extends core_1.Model {
};
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: false,
        defaultValue: core_1.DataTypes.UUIDV4,
    }),
    __metadata("design:type", Object)
], Profile.prototype, "id", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "phone", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.ENUM({ values: ['male', 'Female', 'undefined'] }),
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "gender", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date
    // ===========  Associations  =================
    //  ===============  Profile  =========================
    )
], Profile.prototype, "birthday", void 0);
__decorate([
    (0, decorators_legacy_1.Attribute)({
        type: core_1.DataTypes.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "userId", void 0);
Profile = __decorate([
    (0, table_js_1.Table)({
        timestamps: false,
        tableName: 'profiles',
    })
], Profile);
exports.default = Profile;
