const express = require("express");
const path = require("path");
const {protect} = require("../middleware/auth");
const userModel = require("../models/signup");
const userModel2 = require("../models/sentimentScore");

const app = express.Router();


//add friend

app.route("/addFriend/:_id1/:username").put(protect, async (req,res) => {
    const _id1 = req.params._id1;
    const username = req.params.username;
    const {frnd} = req.body;

   try{
    const rootUser = await userModel.find({_id: _id1});
    const addUser= await userModel.find({username:username});
    //console.log(rootUser,addUser)
    let friend1= await rootUser[0].friends;
    friend1.push(addUser[0].username);
    let friend2= await addUser[0].friends;
    friend2.push(rootUser[0].username);

    const update1 = await userModel.updateOne({_id:_id1},{$set:{friends:friend1}});
    const update2 = await userModel.updateOne({username: username},{$set: {friends: friend2}});  

    return res.status(200).send({success:true,message:"friend added successfully", data: update1, user: req.user});
   }
   catch(err){
    return res.status(500).send({message:err});
   }
});

app.route("/generateScore").post(protect, async(req,res)=>{
    const user = new userModel2(req.body);
    try{
        await user.save();
        return res.status(200).send({ sucess: true, data: user });
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})

app.route("/getScoreDetails/:id").get(protect,async(req,res)=>{
    const _id = req.params.id;
    try{
        const result = await userModel2.find({_id});
        return res.status(200).send({success:true, data: result});
    }
    catch(err){
        return res.status(500).send({success:false, message:err});
    }
})

module.exports = app;
