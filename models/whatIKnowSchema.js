const mongoose = require("mongoose");

const whatIKnowSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const whatIKnow = mongoose.model('knowledge', whatIKnowSchema);

module.exports = whatIKnow;
