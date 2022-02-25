const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },

    description: {
        type: String,
        maxlength:[500, "Description must be less than 500 chracters"],
        default: ""
    },

    image: {
        type: String,
        default:""
    },

    likes: {
        type: Array,
        default: []
    },

    comments: {
        type: Array,
        default: []
    },

}, {timestamps: true});

const post = mongoose.model("posts",  PostSchema);

module.exports = post;