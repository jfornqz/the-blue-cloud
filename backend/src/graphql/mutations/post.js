const { PostTC } = require("../../models/post")

exports.createOnePost = PostTC.getResolver("createOne")
exports.updatePostId = PostTC.getResolver("updateById")
exports.deletePostId = PostTC.getResolver("removeById")

