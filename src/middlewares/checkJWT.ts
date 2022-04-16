import {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["x-auth-token"];
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send({
            message: "Unathorized user"
        });
        return;
    }
    const {userId} = jwtPayload;
    const newToken = jwt.sign({userId}, jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    next();
};