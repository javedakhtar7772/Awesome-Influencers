const { Schema, model } = require("../connection");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  created_at: Date,
  updated_at: Date,
});


module.exports = model("brand", userSchema);
