const { UserTC } = require("../../models/user")

exports.users = UserTC.getResolver("findMany")
