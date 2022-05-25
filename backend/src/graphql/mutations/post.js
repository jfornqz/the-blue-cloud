const { schemaComposer } = require("graphql-compose")

const { PostTC, PostModel } = require("../../models/post")

const { UserTC } = require("../../models/user")

exports.createPost = PostTC.getResolver("createOne")
