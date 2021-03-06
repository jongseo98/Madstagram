const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { 
        type: String,
        maxlength: 50
    },
    content: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    semester: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })


// postSchema.index({ 
//     title:'text',
//     content: 'text',
// }, {
//     weights: {
//         name: 5,
//         description: 1,
//     }
// })

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }