const { FormTC } = require("../../models/form");
const { UserTC } = require("../../models/user");
const { SubmissionTC } = require("../../models/submission");

FormTC.addRelation("post_by", {
  resolver: UserTC.getResolver("findById"),
  projection: { post_by: 1 },
  prepareArgs: {
    _id: (form) => form.post_by,
  },
});

FormTC.addRelation("submissions", {
  resolver: SubmissionTC.getResolver("findMany"),
  prepareArgs: {
    formId: (submission) => submission.form_id,
  },
});
