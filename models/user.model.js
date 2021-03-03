const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
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
  }
});

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
})


const User = model("User", userSchema);

module.exports = User;
