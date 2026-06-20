const { Schema, model } = require("../connection");
const { mongoose } = require("mongoose");
const myschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cpassword: String,
  role: { type: String, default: "user" },
  avatar: String,
  created_at: Date,
  instagramFollowers: { type: Number, default: 0 },
  facebookFollowers: { type: Number, default: 0 },
  youtubeSubscriber: { type: Number, default: 0 },
  facebookLink: String,
  youtubeLink: String,
  instagramLink: String,
});

const userModel = mongoose.model("user", myschema);

module.exports = userModel;
// module.exports = model("user", myschema);
