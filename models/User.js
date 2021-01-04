const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// users schema
const UserSchema = new Schema ({

    //name, email, username, password, age, lists
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('User', UserSchema);