import {verify,sign, TokenExpiredError} from 'jsonwebtoken'
const secret = process.env.JWT_SECRET || "secret";

export const getToken = (userId:string) => {
    const token = sign(userId,secret);
    return token;
}

export const getUserId = (token: string) => {
    const userId = verify(token,secret);
    return userId;
}