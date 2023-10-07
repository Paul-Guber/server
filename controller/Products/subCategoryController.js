"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubCategory = void 0;
const SubCategory_1 = __importDefault(require("../../Models/SubCategory"));
const Category_1 = __importDefault(require("../../Models/Category"));
const getAllSubCategory = async (req, res) => {
    const nameCategory = req.query.nameCategory;
    if (nameCategory) {
        const category = await Category_1.default.findOne({
            where: {
                categoryName: `${nameCategory}`,
            },
        });
        if (category) {
            const subCategories = await SubCategory_1.default.findAll({
                where: {
                    categoryId: category.id,
                },
            }).then((data) => {
                return res.json(data);
            });
            // const subCategories = await category
            // 	.$get('subCategory', {})
            // 	.then((data) => {
            // 		console.log('data :', data)
            // 		return res.json(data)
            // 	})
            // 	.catch((err) => {
            // 		console.log('getAllSubCategory Error: ', err)
            // 	})
        }
        if (!category) {
            return res.status(500);
        }
    }
};
exports.getAllSubCategory = getAllSubCategory;
