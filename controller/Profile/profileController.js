"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.updateProfile = void 0;
const Profile_1 = __importDefault(require("../../Models/Profile"));
// ======================= Update PROFILE ==========================
const updateProfile = async (req, res, 
// res: Response<IProfile>,
next) => {
    // Получаем данные id пользователя после валидации id из промежуточного программного обеспечения,
    // validUserIdMiddleware
    const userId = req.userId;
    if (userId && req.body) {
        const findProfile = await Profile_1.default.findOne({
            where: {
                userId: userId,
            },
        });
        if (findProfile) {
            await findProfile.update({
                gender: 'undefined',
                birthday: new Date('December 20, 2020 10:30:00'),
                ...req.body,
            });
            await findProfile
                .save()
                .then((data) => {
                return res.json({
                    data: data,
                    isMessage: true,
                    message: 'Your profile has been successfully updated!',
                    status: 200,
                });
            })
                .catch((err) => {
                console.log('Cannot update Profile in profileController');
                return res.status(404).json({
                    data: [],
                    isMessage: true,
                    message: 'Fail update profile',
                    status: 404,
                });
            });
        }
        else {
            // Если профиль не найден, то создаем его и вносим данные в БД
            await Profile_1.default.create({
                gender: 'undefined',
                birthday: new Date('December 20, 2020 10:30:00'),
                ...req.body,
                userId: userId,
            })
                .then((profile) => {
                return res.status(200).json({
                    data: profile,
                    isMessage: true,
                    status: 200,
                    message: 'Your profile has been successfully created!',
                });
            })
                .catch((err) => {
                console.log('Cannot create Profile in profileController');
                return res
                    .status(404)
                    .json({ data: [], status: 404, message: 'Fail, cannot create profile', isMessage: true });
            });
        }
    }
    else {
        console.log('Error in findProfileMiddleware, userId === undefined: ', userId);
        return res.status(404).json({ message: 'Fail Profile' });
    }
};
exports.updateProfile = updateProfile;
// ======================= GET PROFILE ==========================
const getProfile = async (req, res, next) => {
    // Получаем данные id пользователя после валидации id из промежуточного программного обеспечения,
    // validUserIdMiddleware
    const userId = req.userId;
    const findProfile = await Profile_1.default.findOne({
        where: {
            userId: userId,
        },
    });
    if (findProfile) {
        return res.status(200).json({ data: findProfile, message: '' });
    }
    else {
        return res.json({ message: 'Fail Profile' });
    }
};
exports.getProfile = getProfile;
