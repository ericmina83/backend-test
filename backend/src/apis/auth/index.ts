import { Router } from "express";
import session from "express-session";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt"

import * as UserModel from "../../models/user";

const access_token_secret = "access_token_secret";
const refresh_token_secret = "refresh_token_secret";

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

const jwtPass = new JWTStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: access_token_secret }, (payload, done) => {
    const user = payload as Express.User;
    UserModel.findById(user.id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

passport.use("jwt", jwtPass);

const router = Router();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
        });
    });
});

passport.deserializeUser<Express.User>(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


router.post('/signin', passport.authenticate("local", { session: true }), (req, res) => {
    console.log(req.session);

    if (!req.user) {
        res.status(401);
        return;
    }

    const { id, username } = req.user;

    res.cookie("refresh_token", jwt.sign({ id, username }, refresh_token_secret), { httpOnly: true, secure: true });

    // req.session.cookie = jwt.sign({ id, username }, refresh_token_secret)

    const { user } = req;
    const token = user ? jwt.sign(user, access_token_secret) : undefined;
    if (!token) {
        res.status(401);
        return;
    }
    res.json(token);
});

export default router;