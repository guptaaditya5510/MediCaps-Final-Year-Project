const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique:true
    },

    phone: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    friends: {
        type: Array,
    }

})

const user = mongoose.model("User", userSchema);
module.exports = user