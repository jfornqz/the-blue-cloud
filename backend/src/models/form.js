const mongoose = require("mongoose");
const moment = require("moment");
const { composeWithMongoose } = require("graphql-compose-mongoose");

const { Schema } = mongoose;

const enumStatus = ["Active", "Inactive"];

const FormSchema = new Schema({
  title: {
    type: String,
    default: null,
  },
  desc: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: `${moment().format("YYYY-MM-DD")}T${moment().format("hh:mm:ss")}`,
  },
  post_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  file: {
    type: [String],
  },
  status: {
    type: String,
    enum: enumStatus,
    default: "Active",
  },
});

const FormModel = mongoose.model("Form", FormSchema);

exports.FormModel = FormModel;

const FormTC = composeWithMongoose(FormModel);

exports.FormTC = FormTC;
