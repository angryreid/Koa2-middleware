const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const giftSchema = new Schema({
  title: String,
  startDate: String,
  endDate: String,
  gift: String,
  disable: {
    required: true,
    type: Boolean,
    default: false
  },
  userId: {
    type: ObjectId,
    ref: "User"
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

giftSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("Gift", giftSchema);
