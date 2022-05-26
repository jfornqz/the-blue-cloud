const { SubmissionTC } = require("../../models/submission")

exports.createOneSubmission = SubmissionTC.getResolver("createOne")
exports.updateSubmissionId = SubmissionTC.getResolver("updateById")
exports.deleteSubmissionId = SubmissionTC.getResolver("removeById")

