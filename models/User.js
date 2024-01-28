// models/User.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String
});

const phoneSchema = new mongoose.Schema({
  type: String,
  number: String
});

const privilegeSchema = new mongoose.Schema({
  page: String,
  privilege: [String]
});

const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  addresses: [addressSchema],
  phones: [phoneSchema],
  profilePicture: String
});

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  isOnline: Boolean,
  profile: profileSchema,
  access: [privilegeSchema],
  plans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
}]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
