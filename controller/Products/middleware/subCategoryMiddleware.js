"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subCategoryMiddleware = void 0;
const SubCategory_1 = __importDefault(require("../../../Models/SubCategory"));
const subCategoryMiddleware = async (req, _res, next) => {
    // если req.body не undefined
    if (req.body) {
        async function printFiles() {
            // ищем уникальные подкатегории
            const unique = req.body.filter((subCatName, i, a) => a.findIndex((indexSubCatName) => subCatName.subCategoryName === indexSubCatName.subCategoryName) === i);
            await Promise.all(unique.map(async (_subCategory) => {
                const findSubCategory = await SubCategory_1.default.findOne({
                    where: {
                        subCategoryName: _subCategory.subCategoryName,
                    },
                });
                // Если нашли подкатегорию то пропускаем запись в БД
                if (findSubCategory) {
                    req.body.map((item) => {
                        if (item.subCategoryName === findSubCategory.subCategoryName) {
                            item.sub_categoryId = findSubCategory.id;
                        }
                    });
                }
                else {
                    //Если не нашли подкатегорию то записываем в БД
                    const createSubCat = await SubCategory_1.default.create({
                        subCategoryName: _subCategory.subCategoryName,
                        categoryId: _subCategory.categoryId,
                        subCategoryImgLink: _subCategory.subCategoryImgLink,
                    });
                    req.body.map((itemReq) => {
                        if (itemReq.subCategoryName === _subCategory.subCategoryName) {
                            itemReq.sub_categoryId = createSubCat.id;
                        }
                    });
                }
            })); // end Promise.all
        }
        await printFiles().then(() => {
            next();
        });
    }
};
exports.subCategoryMiddleware = subCategoryMiddleware;
