import express from "express";
import { singingMW as signinMW } from "./auth"
import passport from "passport";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json("success");
});

app.get('/signin', passport.authenticate("local", { session: false }), signinMW);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
