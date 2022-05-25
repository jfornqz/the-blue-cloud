const { schemaComposer } = require("graphql-compose")

const userQueryFields = require("./queries/user")
const authQueryFields = require("./queries/auth")
const postQueryFields = require("./queries/post")
const formQueryFields = require("./queries/form")

const userMutationFields = require("./mutations/user")
const authMutationFields = require("./mutations/auth")
const postMutationFields = require("./mutations/post")
const formMutationFields = require("./mutations/form")

schemaComposer.Query.addFields(userQueryFields)
schemaComposer.Query.addFields(authQueryFields)
schemaComposer.Query.addFields(postQueryFields)
schemaComposer.Query.addFields(formQueryFields)

schemaComposer.Mutation.addFields(userMutationFields)
schemaComposer.Mutation.addFields(authMutationFields)
schemaComposer.Mutation.addFields(postMutationFields)
schemaComposer.Mutation.addFields(formMutationFields)

const GQLSchema = schemaComposer.buildSchema()

module.exports = GQLSchema
