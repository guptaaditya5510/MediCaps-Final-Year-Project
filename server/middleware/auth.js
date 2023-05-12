const jwt = require("jsonwebtoken");
const userModel = require("../models/signup");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, "Asdfghjklqwertyuiopxcvbnm");
            //console.log(decoded);

            req.user = await userModel.findById(decoded.user[0]._id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
        if (!token) {
            console.log("!")
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
    else {
        //console.log("!")
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})

module.exports = { protect };