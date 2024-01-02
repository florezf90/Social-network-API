const { Schema, model } = require("mongoose");
const Reaction = require("./reaction");
const { formatDate } = require("../utils/timestamp");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => formatDate(date),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [Reaction],

});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);
module.exports = Thought;
