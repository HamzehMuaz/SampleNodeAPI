const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    facebook_likes: {
      type: Number,
    },
    age: {
      type: Number,
    },
    facebook_page_link: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Actor', actorSchema);
