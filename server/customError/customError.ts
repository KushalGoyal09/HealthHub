export class CustomError extends Error {
    discription: string
    statusCode: number
    constructor(message:string,description: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.discription = description
    }
}

export const throwCustomError = (message:string,description: string, statusCode: number) => {
    throw new CustomError(message, description,statusCode);
};

export const throwBadRequestError = (message:string) => {
    throw new CustomError(message, "Bad Request",400);
};

export const throwNotFoundError = (message:string) => {
    throw new CustomError(message, "Not Found",404);
};

export const throwUnauthorizedError = (message:string) => {
    throw new CustomError(message, "Unauthorized",401);
};

export const throwForbiddenError = (message:string) => {
    throw new CustomError(message,"Forbidden",403);
}

export const throwInternalServerError = (message?:string) => {
    throw new CustomError((message || "somthing went wrong"), "Internal Server Error",500);
}