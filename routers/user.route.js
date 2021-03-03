const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user.model");


router.post("/", async (req, res) => {
  try{
    const user = await new User(req.body).save()
    const token = await user.generateToken();
    res.status(201).json({error: false, user, token});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.findByCredentials(email, password);
    const token = await user.generateToken()
    res.json({error: false, user, token});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});

router.post("/logout", auth, async(req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.json({error: false, message: "Logged out"});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
})

router.get("/", auth, async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).json({error: false, users});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});


router.put("/:id", auth, async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findOneAndUpdate({_id: id}, req.body, {new: true, runValidator: true});
    res.status(200).json({error: false, user});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});

router.delete("/:id", auth, async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findOneAndDelete({_id: id});
    res.status(200).json({error: false, user});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
})

module.exports = router;
