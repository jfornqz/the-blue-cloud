const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const moment = require("moment");

const { Schema } = mongoose;

const enumTopic = {
  informationTech: "ข่าวสารเทคโนโลยี",
  announcement: "ประกาศจากทางคณะ",
  activity: "กิจกรรม",
  scholarship: "ทุนการศึกษา",
  job: "ประกาศรับสมัครงาน/ฝึกงาน",
  other: "อื่นๆ",
};

const PostSchema = new Schema({
  title: {
    type: "String",
    required: true,
  },
  desc: {
    type: "String",
    required: true,
  },
  timestamp: {
    type: Date,
    default: `${moment().format("YYYY-MM-DD")}T${moment().format("hh:mm:ss")}`,
  },
  images: {
    type: [String],
  },
  post_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: String,
    enum: Object.keys(enumTopic),
    required: true,
  },
});

const PostModel = mongoose.model("Post", PostSchema);

exports.PostModel = PostModel;

const PostTC = composeWithMongoose(PostModel);

exports.PostTC = PostTC;
