const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    password: String, 
    avatar: String
});

module.exports = mongoose.Model('User', userSchema);
