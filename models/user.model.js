const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Schema, model} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: email => validator.isEmail(email)
    }
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: age => age > 18, message: "Should be older than 18"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {timestamps: true});


userSchema.methods.generateToken = async function(){
  const token = jwt.sign({_id: this._id.toString()}, "back_rus");
  this.tokens = this.tokens.concat({token});
  this.save();
  return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if(!user) throw new Error("User is not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw new Error("User is not found");
  return user;
}

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});


const User = model("User", userSchema);

module.exports = User;
