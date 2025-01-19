import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { Request, Response } from "express";

import * as UserModel from "./models/user";

const secret = "secret";

const checkPassword = async (user: Express.User, password: string): Promise<Express.User> => {
    const pass = await bcrypt.compare(password, user.password);
    return await (pass ? Promise.resolve(user) : Promise.reject(null));
}

const localPass = new LocalStrategy((username, password, done) => {
    UserModel.findOne(username)
        .then(user => checkPassword(user, password))
        .then(user => done(null, user))
        .catch(err => done(err, false))
})

passport.use("local", localPass);

const jwtPass = new JWTStrategy({ jwtFromRequest: ExtractJwt.fromBodyField('token'), secretOrKey: secret }, (payload, done) => {
    const user = payload as Express.User;
    UserModel.findById(user._id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

passport.use("jwt", jwtPass);

export const singingMW = (req: Request, res: Response) => {
    const { user } = req;
    const token = user ? jwt.sign(user, secret) : undefined;
    if (!token) {
        res.status(401);
        return;
    }
    res.json(token);
}
