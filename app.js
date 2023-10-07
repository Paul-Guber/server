"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const userRouter_1 = __importDefault(require("./Routers/userRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./Routers/authRoutes"));
const productRoutes_1 = __importDefault(require("./Routers/productRoutes"));
const cartRoutes_1 = __importDefault(require("./Routers/cartRoutes"));
const deliveryRoutes_1 = __importDefault(require("./Routers/deliveryRoutes"));
const favoriteRoutes_1 = __importDefault(require("./Routers/favoriteRoutes"));
const profileRoutes_1 = __importDefault(require("./Routers/profileRoutes"));
const orderRoutes_1 = __importDefault(require("./Routers/orderRoutes"));
const main = async () => {
    const app = (0, express_1.default)();
    app.use((0, express_fileupload_1.default)({
        createParentPath: true,
    }));
    const port = 5050;
    const modeEnv = app.get('env');
    app.use((0, cors_1.default)({
        origin: ['http://localhost:5173', 'http://localhost'],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    dotenv_1.default.config();
    app.use((0, cookie_parser_1.default)());
    app.use('/api', userRouter_1.default);
    app.use('/api', authRoutes_1.default);
    app.use('/api', productRoutes_1.default);
    app.use('/api', cartRoutes_1.default);
    app.use('/api', deliveryRoutes_1.default);
    app.use('/api', favoriteRoutes_1.default);
    app.use('/api', profileRoutes_1.default);
    app.use('/api', orderRoutes_1.default);
    app.use((err, req, res, next) => {
        res.status(500).json({ message: err.message });
    });
    // connection
    // 	.sync(
    // 		modeEnv === 'development'
    // 			? { alter: true, force: false }
    // 			: { alter: undefined },
    // 	)
    connection_1.default
        .sync({
    // alter: true,
    //force: true,
    })
        .then(() => {
        console.log('Database successfully connected');
    })
        .catch((err) => {
        console.log('Error', err);
    });
    app.listen(port, () => {
        console.log(`server is running port ${port}`);
    });
};
main().catch((err) => {
    console.log(err);
});
