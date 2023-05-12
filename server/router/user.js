const express = require("express");
const path = require("path");
const userModel = require("../models/signup");

const { protect } = require("../middleware/auth");

const app = express.Router();


//api for get user by id

app.route('/getuser_byId/:_id').get(protect, async (req, res) => {
    const _id = req.params._id;
    try {
        const user = await userModel.find({ _id });
        if (user.lenght !== 0) {
            return res.status(200).send({ success: true, data: user, user: req.user });
        }
        else {
            return res.status(200).send({ success: false });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }
})

app.route('/getuser_byUsername/:username').get(protect, async (req, res) => {
    const username = req.params.username;
    try {
        const user = await userModel.find({ username });
        if (user.length !== 0) {
            return res.status(200).send({ success: true, data: user[0], user: req.user });
        }
        else {
            return res.status(200).send({ success: false });
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: error });
    }
})

//api to get all users list

app.route("/getAll_users").get(protect, async (req, res) => {
    try {
        const allUsers = await userModel.find({});
        return res.status(200).send({ success: true, data: allUsers, user: req.user });
    }
    catch (err) {
        return res.status(500).send({ success: false, message: err });
    }
})

//get all users except you

app.route("/getUsername/:username").get(protect, async (req, res) => {
    const username = req.params.username;
    try {
        const allUserName = await userModel.find({});
        const u = [];
        await allUserName.map((item, index) => {
            if (item.username !== username) {
                u.push(item.username);
            }
        });

        res.status(200).send({ success: true, data: u, user: req.user });
    }
    catch (err) {
        return res.status(500).send({ success: false, message: err });
    }
})

module.exports = app