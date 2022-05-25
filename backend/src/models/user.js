const mongoose = require("mongoose")
const { composeWithMongoose } = require("graphql-compose-mongoose")
const { Schema } = mongoose

const bcrypt = require("mongoose-bcrypt")

const enumRole = {
    ADMIN: "Admin",
    STUDENT: "Student",
}

const UserSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.keys(enumRole),
    },
})

UserSchema.plugin(bcrypt)

const UserModel = mongoose.model("User", UserSchema)

exports.UserModel = UserModel

const UserTC = composeWithMongoose(UserModel).removeField("password")

exports.UserTC = UserTC
