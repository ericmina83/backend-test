import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt"

import * as UserModel from "../../models/user";

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

const jwtPass = new JWTStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: secret }, (payload, done) => {
    const user = payload as Express.User;
    UserModel.findById(user.id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

passport.use("jwt", jwtPass);
