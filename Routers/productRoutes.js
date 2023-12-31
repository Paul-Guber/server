"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/Products/productController");
const categoryMiddleware_1 = require("../controller/Products/middleware/categoryMiddleware");
const subCategoryMiddleware_1 = require("../controller/Products/middleware/subCategoryMiddleware");
const AddJsonFileMiddleware_1 = require("../controller/Products/middleware/AddJsonFileMiddleware");
const subCategoryController_1 = require("../controller/Products/subCategoryController");
const getAllSubCategoryMiddleware_1 = require("../controller/Products/middleware/getAllSubCategoryMiddleware");
const getAllCategoriesController_1 = require("../controller/Products/getAllCategoriesController");
const productRoutes = (0, express_1.Router)();
productRoutes.post('/shop/addProduct', AddJsonFileMiddleware_1.AddJsonFileMiddleware, categoryMiddleware_1.categoryMiddleware, subCategoryMiddleware_1.subCategoryMiddleware, productController_1.addProduct);
productRoutes.get('/shop/getProducts', productController_1.getProducts);
productRoutes.get('/shop/getAllSubCategories', subCategoryController_1.getAllSubCategory);
productRoutes.get('/shop/getAllCategories', getAllCategoriesController_1.getAllCategories);
productRoutes.get('/shop/getProductsSubCategories', getAllSubCategoryMiddleware_1.getAllSubCategoryMiddleware, productController_1.getAllProductsSubCategory);
exports.default = productRoutes;
