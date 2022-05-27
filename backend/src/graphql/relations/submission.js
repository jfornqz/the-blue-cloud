const { FormTC } = require("../../models/form");
const { SubmissionTC } = require("../../models/submission");
const { UserTC } = require("../../models/user");

SubmissionTC.addRelation("submitted_by", {
  resolver: UserTC.getResolver("findById"),
  projection: { submitted_by: 1 },
  prepareArgs: {
    _id: (submission) => submission.submitted_by,
  },
});

SubmissionTC.addRelation("form_id", {
  resolver: FormTC.getResolver("findById"),
  projection: { form_id: 1 },
  prepareArgs: {
    _id: (submission) => submission.form_id,
  },
});
