const { SubmissionTC } = require("../../models/submission");

exports.submissions = SubmissionTC.getResolver("findMany");
exports.submissionId = SubmissionTC.getResolver("findById");
