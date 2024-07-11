"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.getToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";
const getToken = (userId) => {
    const token = (0, jsonwebtoken_1.sign)(userId, secret);
    return token;
};
exports.getToken = getToken;
const getUserId = (token) => {
    const userId = (0, jsonwebtoken_1.verify)(token, secret);
    return userId;
};
exports.getUserId = getUserId;
