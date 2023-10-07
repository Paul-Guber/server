"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryMiddleware = void 0;
const Category_1 = __importDefault(require("../../../Models/Category"));
const fs_1 = __importDefault(require("fs"));
const categoryMiddleware = async (req, res, next) => {
    const linkJson = req.jsonLink;
    fs_1.default.readFile(linkJson, 'utf8', async (err, jsonData) => {
        if (err) {
            console.log(err);
            return;
        }
        const data = JSON.parse(jsonData);
        const newObj = data;
        req.body = [...newObj];
        async function printFiles() {
            const unique = newObj.filter((catName, i, a) => a.findIndex((indexCatName) => catName.categoryName === indexCatName.categoryName) === i);
            await Promise.all(unique.map(async (_category) => {
                const findCategory = await Category_1.default.findOne({
                    where: { categoryName: _category.categoryName },
                });
                if (!findCategory) {
                    // Создаём категорию товара
                    const createCategory = await Category_1.default.create({
                        categoryName: _category.categoryName,
                    });
                    newObj.map((item) => {
                        if (item.categoryName === _category.categoryName) {
                            item.categoryId = createCategory.id;
                        }
                    });
                }
                else {
                    // если категория найдена то ничего не записываем в БД
                    newObj.map((item) => {
                        if (item.categoryName === _category.categoryName) {
                            item.categoryId = findCategory.id;
                        }
                    });
                }
            })); // end Promise.all
        } // end printFiles()
        await printFiles().then(() => {
            next();
        });
    });
};
exports.categoryMiddleware = categoryMiddleware;
