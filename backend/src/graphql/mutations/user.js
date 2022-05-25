const { UserTC } = require("../../models/user")

exports.createOneUser = UserTC.getResolver("createOne")
