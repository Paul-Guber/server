"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../../Models/Category"));
const SubCategory_1 = __importDefault(require("../../Models/SubCategory"));
const getAllCategories = async (req, res) => {
    const findCategories = await Category_1.default.findAll({
        nest: true,
        include: [SubCategory_1.default],
    });
    const newData = [];
    const getPromise = async () => {
        Promise.all(findCategories.map((category) => {
            return category.subCategory.map((subCategory) => {
                newData.push({
                    categoryId: category.id,
                    categoryName: category.categoryName,
                    subCategoryId: subCategory.id,
                    subCategoryImgLink: subCategory.subCategoryImgLink,
                    subCategoryName: subCategory.subCategoryName,
                });
                return newData;
            });
        }));
    };
    await getPromise().then(() => {
        return res.json(newData);
    });
};
exports.getAllCategories = getAllCategories;
