const { PostTC } = require("../../models/post")
const { FormTC } = require("../../models/form")
const { UserTC } = require("../../models/user")

UserTC.addRelation(
  'posts',
  {
    resolver: PostTC.getResolver('findMany'),
    projection: { _id: 1 },
    prepareArgs: {
      filter: (user) => ({
        post_by: user._id,
      }),
    },
  },
  'forms',
  {
    resolver: FormTC.getResolver('findMany'),
    projection: { _id: 1 },
    prepareArgs: {
      filter: (user) => ({
        post_by: user._id,
      }),
    },
  },
)
