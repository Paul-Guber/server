"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validUserIdMiddleware = async (req, res, next) => {
    const userId = req.userId;
    if (userId) {
        if (isValidUuid(userId)) {
            req.userId = userId;
            next();
        }
        else {
            console.log('Error in validUserId, isValidUuid === false');
            return res.status(404);
        }
    }
    else {
        console.log('Error in validUserId , req.query.userId === undefined');
        return res.status(404);
    }
};
const isValidUuid = (id) => {
    const isUid = id.match(/^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i);
    if (isUid === null) {
        return false;
    }
    else {
        return true;
    }
};
// UUID v4 :
// /^(?:[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a‌​-f]{3}-?[0-9a-f]{12}‌​|00000000-0000-0000-‌​0000-000000000000)$/‌​i
exports.default = validUserIdMiddleware;
