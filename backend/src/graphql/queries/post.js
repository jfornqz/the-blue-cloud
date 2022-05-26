const { PostTC } = require("../../models/post")

exports.posts = PostTC.getResolver("findMany")
exports.postId = PostTC.getResolver("findById")