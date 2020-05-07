let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let registerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /@/
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Register', registerSchema);