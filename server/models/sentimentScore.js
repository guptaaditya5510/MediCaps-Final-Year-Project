const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    sentimentsScore:{
        type: Array
    }
})

const user = mongoose.model("SentimentDetail", userSchema);
module.exports = user