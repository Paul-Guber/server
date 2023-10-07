"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddJsonFileMiddleware = void 0;
const AddJsonFileMiddleware = async (req, res, next) => {
    // Если есть файл
    if (req.files?.jsonFile) {
        // директория для фала json
        const newpath = `./images/`;
        const file = req.files?.jsonFile;
        // сохраняем файл на сервер директория + имя файла с расширением
        file.mv(`${newpath}${file.name}`, (err) => {
            if (err) {
                console.log(err);
                // return res.status(500).json({ message: 'File upload failed' })
                next(new Error(`File upload failed: ${err}`));
            }
            // если ошибок нет, то передаем ссылку на файл и вызываем next()
            req.jsonLink = `${newpath}${file.name}`;
            next();
        });
    }
};
exports.AddJsonFileMiddleware = AddJsonFileMiddleware;
