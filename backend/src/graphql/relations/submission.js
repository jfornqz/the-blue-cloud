const { FormTC } = require("../../models/form")
const { SubmissionTC } = require("../../models/submission")
const { UserTC } = require("../../models/user")

SubmissionTC.addRelation(
  'submitted_by',
  {
    resolver: UserTC.getResolver('findById'),
    projection: { submitted_by: 1 },
    prepareArgs: {
      _id: (submission) => submission.submitted_by,
    },
  },
)
