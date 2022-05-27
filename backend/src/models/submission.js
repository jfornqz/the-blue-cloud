const mongoose = require("mongoose")
const { composeWithMongoose } = require("graphql-compose-mongoose")
const moment = require("moment")

const { Schema } = mongoose

const enumStatus = ["Waiting", "In progress", "Approved", "Reject"]

const SubmissionSchema = new Schema({
    status: {
        type: String,
        enum: enumStatus,
        default: "Waiting",
    },
    file: {
        type: [String],
    },
    timestamp: {
        type: Date,
        default: `${moment().format("YYYY-MM-DD")}T${moment().format("hh:mm:ss")}`,
    },
    submitted_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    form_id: {
        type: Schema.Types.ObjectId,
        ref: "Form",
    },
    note: {
        type: String,
        default: "",
    },
})

const SubmissionModel = mongoose.model("Submission", SubmissionSchema)

exports.SubmissionModel = SubmissionModel

const SubmissionTC = composeWithMongoose(SubmissionModel)

exports.SubmissionTC = SubmissionTC
