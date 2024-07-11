"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const customError_1 = require("../customError/customError");
const jwt_1 = require("../utils/jwt");
var Role;
(function (Role) {
    Role["Doctor"] = "DOCTOR";
    Role["Patient"] = "PATIENT";
    Role["User"] = "USER";
    Role["Admin"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        (0, customError_1.throwUnauthorizedError)("No Token Found");
        return;
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        (0, customError_1.throwUnauthorizedError)("No Token Found");
        return;
    }
    try {
        const payload = (0, jwt_1.getUserId)(token);
        if (typeof payload === "string") {
            req.userId = payload;
            req.role = Role.User;
            next();
        }
    }
    catch (error) {
        (0, customError_1.throwForbiddenError)("Invalid token");
    }
};
exports.default = authMiddleware;
