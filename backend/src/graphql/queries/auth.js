const { UserTC, UserModel } = require("../../models/user")

const { schemaComposer } = require("graphql-compose")

exports.me = schemaComposer.createResolver({
    name: "me",
    kind: "query",
    type: UserTC.getType(),
    args: {
        _id: "MongoID!",
    },
    resolve: async ({ args }) => {
        const { _id } = args

        const me = await UserModel.findOne({ _id: _id })

        if (!me) {
            throw new Error("Not found user")
        }

        return me
    },
})
