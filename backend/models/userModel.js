const { Schema, model } = require('../connection');

const myschema = new Schema({
    name: String,
    email: String,
    password: String,
    cpassword : String,
    role: { type: String, default: 'user' },
    avatar: String,
    created_at: Date,
    instagramFollowers: { type: Number, default: 0 },
    facebookFollowers: { type: Number, default: 0 },
    youtubeSubscribres: { type: Number, default: 0 },
});

module.exports = model('user', myschema);