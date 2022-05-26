const { FormTC } = require("../../models/form");

exports.forms = FormTC.getResolver("findMany");
exports.formId = FormTC.getResolver("findById");
