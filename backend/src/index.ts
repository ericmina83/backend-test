import express from "express";
import passport from "passport";

import auth from "./apis/auth";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json("success");
});

app.use(auth);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
