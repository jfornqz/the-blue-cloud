const { PostTC } = require("../../models/post");
const { UserTC } = require("../../models/user");

PostTC.addRelation("post_by", {
  resolver: UserTC.getResolver("findById"),
  projection: { post_by: 1 },
  prepareArgs: {
    _id: (post) => post.post_by,
  },
});
