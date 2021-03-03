const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");
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

router.post("/avatar/:id", auth, upload.single("avatar"), async (req, res) => {
  const id = req.params.id;
  try{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    const user = await User.findById(id);
    user.avatar = buffer;
    await user.save();
    res.status(200).json({error: false, message: "Image upload"});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});

router.get("/avatar/:id", auth, async (req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findById(id);
    if(!user || !user.avatar) throw new Error("Image or user is not found");
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  }catch({message}){
    res.status(404).json({error: true, message});
  }
})

module.exports = router;
