"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSubCategoryMiddleware = void 0;
const SubCategory_1 = __importDefault(require("../../../Models/SubCategory"));
const Category_1 = __importDefault(require("../../../Models/Category"));
const Products_1 = require("../../../Models/Products");
const getAllSubCategoryMiddleware = async (req, res, next) => {
    const name = req.query.nameSubCategory;
    const limit = req.query.limit;
    const offsetPage = req.query.offsetPage;
    if (name !== '' && name && limit) {
        const newProducts = [];
        console.log('name: ', name);
        await Category_1.default.findAndCountAll({
            subQuery: false,
            where: {
                categoryName: name,
            },
            include: [
                {
                    required: false,
                    model: SubCategory_1.default,
                    order: ['subCategoryName'],
                    include: [
                        {
                            required: true,
                            model: Products_1.Product,
                            // order: [['product_tittle', 'DESC']],
                        },
                    ],
                },
            ],
            order: [
                [SubCategory_1.default, 'subCategoryName'],
                [SubCategory_1.default, Products_1.Product, 'product_tittle', 'ASC'],
                // [Product, 'product_tittle', 'ASC'],
            ],
            limit: +limit.replace(/[^+\d]/g, ''),
            offset: +offsetPage.replace(/[^+\d]/g, ''),
        })
            .then(({ rows, count }) => {
            console.log(count);
            rows.map((item) => {
                item.subCategory.map((iSub) => {
                    iSub.products.map((productItem) => {
                        newProducts.push({
                            ...productItem.toJSON(),
                            subCategoryName: item.categoryName,
                        });
                    });
                });
            });
            return {
                count,
                newProducts,
            };
        })
            .then(({ count, newProducts }) => {
            if (newProducts && newProducts.length > 0) {
                const productsResponse = {
                    products: newProducts,
                    count: count,
                };
                return res.status(200).json(productsResponse);
            }
            else {
                console.log(newProducts);
                next();
            }
        });
    }
};
exports.getAllSubCategoryMiddleware = getAllSubCategoryMiddleware;
