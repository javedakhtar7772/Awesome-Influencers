const { Schema, model, Types } = require("../connection");

const schema = new Schema({
  job: { type: Types.ObjectId, ref: "jobs" },
  user: { type: Types.ObjectId, ref: "user" },
  created_at: Date,
  updated_at: Date,
});
    
module.exports = model("enrollments", schema);
