const express = require('express');
const router = express.Router();
const User = require("../models/user.model");


router.post("/", async (req, res) => {
  try{
    const user = await new User(req.body).save()
    res.status(201).json({error: false, user});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});

router.get("/", async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).json({error: false, users});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});


router.put("/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findOneAndUpdate({_id: id}, req.body, {new: true, runValidator: true});
    res.status(200).json({error: false, user});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
});

router.delete("/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findOneAndDelete({_id: id});
    res.status(200).json({error: false, user});
  }catch({message}){
    res.status(500).json({error: true, message});
  }
})

module.exports = router;
