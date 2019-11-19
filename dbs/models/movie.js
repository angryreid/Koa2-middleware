const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed, ObjectId } = Schema.Types;

const movieSchema = new Schema({
  doubanId: String,
  rate: Number,
  summary: String,
  video: String,
  poster: String,
  cover: String,

  videoKey: String,
  coverKey: String,
  posterKey: String,

  title: String,
  rawTitle: String,
  movieTypes: [String],
  pubdates: Mixed,
  year: Number,

  category: [{
    type: ObjectId,
    ref: "Category"
  }],

  tags: [String],
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

movieSchema.pre("save", function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.updateAt = Date.now();
  } else {
    this.updateAt = Date.now();
  }

  next();
});

module.exports = mongoose.model("Movie", movieSchema);
