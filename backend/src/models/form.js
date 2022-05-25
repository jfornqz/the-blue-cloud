const mongoose = require("mongoose")
const moment = require("moment")
const { composeWithMongoose } = require("graphql-compose-mongoose")

const { Schema } = mongoose

const enumStatus = {
    ACTIVE: "Active",
    IN_ACTIVE: "In Active"
}

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
        type: Schema.Types.String,
        ref: "User",
    },
    file: {
        type: [String],
    },
    submission: [
        {
            type: Schema.Types.Mixed,
        },
    ],
    status: {
        type: String,
        enum: Object.keys(enumStatus),
    },
})

const FormModel = mongoose.model("Form", FormSchema)

exports.FormModel = FormModel

const FormTC = composeWithMongoose(FormModel)

exports.FormTC = FormTC
