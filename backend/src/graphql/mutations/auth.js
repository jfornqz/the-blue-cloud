const { UserTC, UserModel } = require("../../models/user")
const jsonwebtoken = require("jsonwebtoken")
const { ValidationError } = require("apollo-server-express")

const { schemaComposer } = require("graphql-compose")

const LoginPayLoad = schemaComposer.createObjectTC({
    name: "LoginPayLoad",
    fields: {
        token: "String",
        user: UserTC.getType(),
    },
})

exports.login = schemaComposer.createResolver({
    name: "login",
    kind: "mutation",
    args: {
        email: "String",
        password: "String!",
    },
    type: LoginPayLoad,
    resolve: async ({ args }) => {
        const { email, password } = args

        const user = await UserModel.findOne({ email: email })

        if (!user) {
            throw new ValidationError("Email not found")
        }

        const validatePass = await user.verifyPassword(password)

        if (!validatePass) {
            throw new ValidationError("Incorrect password!")
        }

        return { token: jsonwebtoken.sign({ _id: user._id }, "ilikecoffeesomuchna", { expiresIn: "1d", algorithm: "HS256" }), user }
    },
})
