const express = require("express");
const path = require("path");
const userModel = require("../models/signup");
const Jwt = require("jsonwebtoken");

const app = express.Router();


// app.route("/").get((req,res) => {
//     res.sendFile(path.join(__dirname, "../public","index.html"))
// })


//api for login

app.route("/login").post(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username !== "" && password !== "") {
        const user = await userModel.find({ $and: [{ username }, { password }] });
        try {
            if (user.length > 0) {
                // res.send("login sucessful");
                //return res.status(200).send({sucess: true, data: user});
                Jwt.sign({ user }, "Asdfghjklqwertyuiopxcvbnm", (err, token) => {
                    if (err) throw err;
                    return res.status(200).send({ success: true, data: user[0], auth: token });
                })
            } else {
                res.status(200).send({ sucess: false, message: "account not registered" });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    }
})


//api for signup

app.route("/register").post(async (req, res) => {
    console.log(req.body)
    const user = new userModel(req.body);
    const checkUser = await userModel.find({ username: req.body.username })
    console.log(checkUser);

    try {
        if (checkUser.length == 0) {
            await user.save();
            //   res.sendFile(path.join(__dirname, "../public","index.html"));
            return res.status(200).send({ sucess: true, data: user });
        }
        else {
            res.status(200).send({ sucess: false, message: "account already registered" });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
})




module.exports = app