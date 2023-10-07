"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsSubCategory = exports.getProducts = exports.addProduct = void 0;
const Products_1 = require("../../Models/Products");
const SubCategoryAdditions_1 = __importDefault(require("../../Models/SubCategoryAdditions"));
const SubCategory_1 = __importDefault(require("../../Models/SubCategory"));
//
//========================= ADD PRODUCT ==============================================
//
const addProduct = async (req, res) => {
    // если req.body не undefined
    console.log('addProduct');
    if (req.body) {
        const findProducts = await Products_1.Product.findAll();
        // отсеиваем в запросе request все товары которые дублируются по названию
        const unique = req.body.filter((product, i, a) => a.findIndex((indexProduct) => product.product_tittle === indexProduct.product_tittle) === i);
        const filesReturn = async () => {
            Promise.all(unique.map(async (productItem) => {
                const uniqueProducts = findProducts.findIndex((find) => find.product_tittle !== productItem.product_tittle);
                console.log('uniqueProducts: ', uniqueProducts);
                // если в БД нет повторяющихся товаров, то записываем в БД иначе ничего не делаем.
                // и если БД пуста то записываем товары, т.к. они уникальны, сравнивать не с чем.
                if (uniqueProducts !== -1 || findProducts.length === 0) {
                    return await Products_1.Product.create({
                        product_sku: +productItem.product_sku,
                        product_tittle: productItem.product_tittle,
                        product_price: +productItem.product_price ? +productItem.product_price : 0,
                        product_quality: 1,
                        product_discount: +productItem.product_discount,
                        product_description: productItem.product_description,
                        product_metaTittle: productItem.product_metaTittle,
                        sub_categoryId: productItem.sub_categoryId,
                        image_product: productItem.image_link ? productItem.image_link : '',
                        product_badge: productItem.product_badge,
                    }, {
                        include: [SubCategoryAdditions_1.default],
                    }).then((product) => {
                        // Если заданы дополнительные опции к категории товара, то создаём массив строк, разделенной запятыми
                        const tempOptions = productItem.subCategoryOptions
                            ? productItem.subCategoryOptions.split(',')
                            : [];
                        if (tempOptions && tempOptions.length > 0) {
                            tempOptions.map(async (_item) => {
                                return await SubCategoryAdditions_1.default.create({
                                    productId: product.id,
                                    subCategoryExtends: _item,
                                });
                            });
                        }
                    });
                }
            }));
        };
        await filesReturn()
            .then(() => {
            return res.status(200).json({ message: 'Ok' });
        })
            .catch((error) => {
            console.log('promise Errors: ', error);
        });
    }
    else {
        return res.status(500).json({ message: 'Fail' });
    }
};
exports.addProduct = addProduct;
//
//========================= GET PRODUCTS ALL ==============================================
//
const getProducts = async (_req, res) => {
    const product = [];
    const subCategories = await SubCategory_1.default.findAll({
        include: [Products_1.Product],
    });
    const getProductsAll = async () => {
        await Promise.all(subCategories.map(async (subCategory) => {
            return subCategory.get('products').map((productItem) => {
                product.push({
                    product_tittle: productItem.product_tittle ? productItem.product_tittle : '',
                    product_description: productItem?.product_description,
                    product_price: productItem.product_price + '',
                    image_link: productItem.image_product,
                    categoryId: '',
                    categoryName: '',
                    subCategoryName: subCategory.subCategoryName,
                    subCategoryOptions: '',
                    subCategoryImgLink: subCategory.subCategoryImgLink,
                    product_sku: productItem.product_sku.toString(),
                    product_discount: productItem.product_discount.toString(),
                    product_badge: productItem.product_badge,
                    sub_categoryId: '',
                    product_metaTittle: '',
                    product_id: productItem.id,
                });
            });
        }));
    };
    getProductsAll().then((_data) => {
        return res.json(product);
    });
};
exports.getProducts = getProducts;
//
//=========================  GET PRODUCTS SUBCATEGORY  =========================================
//
const getAllProductsSubCategory = async (req, res) => {
    const name = req.query.nameSubCategory;
    const limit = req.query.limit;
    const offsetPage = req.query.offsetPage;
    const newProducts = [];
    console.log('getAllProductsSubCategory name: ', name);
    console.log('getAllProductsSubCategory limit: ', limit);
    console.log('getAllProductsSubCategory offsetPage: ', offsetPage);
    await SubCategory_1.default.findAndCountAll({
        subQuery: false,
        where: {
            subCategoryName: name,
        },
        include: [
            {
                model: Products_1.Product,
                required: true,
            },
        ],
        limit: +limit,
        offset: +offsetPage,
        order: [[Products_1.Product, 'product_tittle', 'ASC']],
    })
        .then(({ rows, count }) => {
        console.log(count);
        rows.map((item) => {
            item.products.map((productItem) => {
                newProducts.push({
                    ...productItem.toJSON(),
                    subCategoryName: item.subCategoryName,
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
            console.log('Error in getAllProductsSubCategory newProducts: ', newProducts, 'count: ', count);
            return res.status(200).json({ products: newProducts, count: count });
        }
    });
};
exports.getAllProductsSubCategory = getAllProductsSubCategory;
