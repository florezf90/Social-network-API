const { Schema, model, Types } = require("mongoose");
const { formatDate } = require("../utils/timestamp");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => formatDate(date),
  },
  toJSON: {
    getters: true,
  },
  id: false,
});

module.exports = reactionSchema;
