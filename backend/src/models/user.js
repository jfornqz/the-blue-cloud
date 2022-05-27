const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const { Schema } = mongoose;

const bcrypt = require("mongoose-bcrypt");

const enumRole = ["Admin", "Student"];

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: enumRole,
    required: true,
  },
});

UserSchema.plugin(bcrypt);

const UserModel = mongoose.model("User", UserSchema);

exports.UserModel = UserModel;

const UserTC = composeWithMongoose(UserModel).removeField("password");

exports.UserTC = UserTC;
