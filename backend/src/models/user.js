const mongoose = require("mongoose")
const { composeWithMongoose } = require("graphql-compose-mongoose")
const { Schema } = mongoose

const bcrypt = require("mongoose-bcrypt")

const enumRole = ["Admin", "Student"]

const UserSchema = new Schema({
    fullname: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        enum: enumRole,
    },
})

UserSchema.plugin(bcrypt)

const UserModel = mongoose.model("User", UserSchema)

exports.UserModel = UserModel

const UserTC = composeWithMongoose(UserModel).removeField("password")

exports.UserTC = UserTC
