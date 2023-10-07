"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = void 0;
const User_1 = require("../Models/User");
//=============================== DELETE USER =======
const deleteUser = async (req, res, next) => {
    const id = req.body.uid;
    const deleteUser = await User_1.User.destroy({ where: { uid: id } });
    return res.status(200).json({ message: 'User created successfully', data: deleteUser });
};
exports.deleteUser = deleteUser;
//=============================== UPDATE USER ==============
const updateUser = async (req, res, next) => {
    const id = req.body.uid;
    console.log(req.body);
    await User_1.User.update({ ...req.body }, { where: { uid: id } });
    const updatedUser = await User_1.User.findByPk(id);
    return res.status(200).json({ message: 'Todo updated successfully', data: updatedUser });
};
exports.updateUser = updateUser;
