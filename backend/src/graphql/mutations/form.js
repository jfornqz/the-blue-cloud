const { FormTC } = require("../../models/form")

exports.createOneForm = FormTC.getResolver("createOne")
exports.updateFormId = FormTC.getResolver("updateById")
exports.deleteFormId = FormTC.getResolver("removeById")

