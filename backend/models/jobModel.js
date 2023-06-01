const { Schema, model, Types } = require("../connection");

const schema = new Schema({
  brand: { type: Types.ObjectId, ref: "brand" },
  title: { type: String, required: true },
  incentive: { type: Number, required: true },
  description: { type: Object },
  image : {type: String, default: 'campaign_placeholder.png'},
  type: { type: String },
  data: { type: Object },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, default: "active" },
  enrolled : [{ type: Types.ObjectId, ref: "user" }],
  requirements: {type : Object, default: {
    facebook: 0,
    instagram: 0,
    youtube: 0
  }},
  notes: String,
  created_at: Date,
  updated_at: Date,
});

module.exports = model("jobs", schema);
