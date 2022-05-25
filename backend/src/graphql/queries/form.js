const { FormTC } = require("../../models/form")

exports.forms = FormTC.getResolver("findMany")
