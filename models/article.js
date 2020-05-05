const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title: String,
    description: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
},{timestamps:true})

module.exports = mongoose.model('Article', articleSchema);