const mongoose = require("mongoose");
const { Schema } = mongoose;
const connection = require("../utils/connection");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  custname: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  providerName: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  searchCity: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  },
  experience: {
    type: String,
    trim: true
  },
  isCustomer: {
    type: Boolean,
    default: false
  },
  isProvider: {
    type: Boolean,
    default: false
  },
  providerImage: {
    type: String,
    default: 'default-image.png'
  },
  speciality1: {
    type: String,
    trim: true
  },
  speciality2: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const User = connection.model("User", UserSchema);

module.exports = User;
