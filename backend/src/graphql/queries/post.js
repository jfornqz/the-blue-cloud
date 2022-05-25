const { schemaComposer } = require("graphql-compose")
const { PostTC, PostModel } = require("../../models/post")

exports.posts = PostTC.getResolver("findMany")
