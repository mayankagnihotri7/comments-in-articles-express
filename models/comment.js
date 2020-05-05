let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: String,
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Comment', commentSchema);