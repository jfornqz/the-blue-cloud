const { schemaComposer } = require("graphql-compose")

const { FormTC } = require("../../models/form")

exports.createForm = FormTC.getResolver("createOne")
