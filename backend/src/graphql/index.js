const { schemaComposer } = require("graphql-compose")
require("./relations")

const userQueryFields = require("./queries/user")
const authQueryFields = require("./queries/auth")
const postQueryFields = require("./queries/post")
const formQueryFields = require("./queries/form")
const submissionQueryFields = require("./queries/submission")

const userMutationFields = require("./mutations/user")
const authMutationFields = require("./mutations/auth")
const postMutationFields = require("./mutations/post")
const formMutationFields = require("./mutations/form")
const submissionMutationFields = require("./mutations/submission")


schemaComposer.Query.addFields(userQueryFields)
schemaComposer.Query.addFields(authQueryFields)
schemaComposer.Query.addFields(postQueryFields)
schemaComposer.Query.addFields(formQueryFields)
schemaComposer.Query.addFields(submissionQueryFields)

schemaComposer.Mutation.addFields(userMutationFields)
schemaComposer.Mutation.addFields(authMutationFields)
schemaComposer.Mutation.addFields(postMutationFields)
schemaComposer.Mutation.addFields(formMutationFields)
schemaComposer.Mutation.addFields(submissionMutationFields)


const GQLSchema = schemaComposer.buildSchema()

module.exports = GQLSchema
